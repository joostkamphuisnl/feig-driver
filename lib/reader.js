const usb = require('usb')
const { addCrcToBuffer } = require('./utils/crc16')
const Commands = require('./constants/commands')
const ISOStandardCommands = require('./constants/isoStandardCommands')
const ParseStatus = require('./constants/parseStatus')
const Response = require('./response')
const Status = require('./constants/status')
const TransponderType = require('./constants/transponderType')
const Protocol = require('./constants/protocol')
const convertToHexString = require('./utils/convertToHexString')

/**
 * Default configuration.
 */
const defaultConfig = {
    vendorId: 2737,
    productId: 4,
    debug: false,
    protocol: Protocol.Standard
}

/**
 * Feig Reader class.
 */
class Reader {

    /**
     * Reader constructor.
     * @param {options} options Initializer options
     */
    constructor ({
        vendorId = defaultConfig.vendorId,
        productId = defaultConfig.productId,
        debug = defaultConfig.debug,
        protocol = defaultConfig.Standard
    }) {
        this.config = {
            vendorId,
            productId,
            debug,
            protocol,
        }

        this.mSuccessCallback = null
        this.mErrorCallback = null
        this.tempBuffer = []
    }

    /**
     * Connect to the RFID scanner.
     *
     * @memberof Reader
     */
    connect () {
        return new Promise ((resolve, reject) => {

            if (this.config.debug) {
                // Don't actually connect when running in debug mode.
                resolve ()
                return
            }

            // Find the USB device by vendorId and productId.
            this.device = usb.findByIds(this.config.vendorId, this.config.productId)

            if (this.device) {

                try {
                    // Open the device.
                    this.device.open ()

                    // It should always have an interface.
                    this.interface = this.device.interface(0)

                    // Claim the interface.
                    this.interface.claim ()

                    // Read endpoint.
                    this.readEndpoint = this.interface.endpoints.find(endpoint => endpoint.direction === "in")

                    // Write endpoint.
                    this.writeEndpoint = this.interface.endpoints.find(endpoint => endpoint.direction === "out")

                    // Set-up event listeners on the read endpoint.
                    this.readEndpoint.on('data', this._handleData.bind(this))
                    this.readEndpoint.on('error', this._handleError.bind(this))

                    // Start listening to the RFID output.
                    this.readEndpoint.startPoll ()

                    resolve ()

                } catch (e) {

                    reject (e)

                }
            } else {

                // The USB device cannot be found
                reject (`Couldn't connect to USB device with vendorId: ${this.config.vendorId} and productId: ${this.config.productId}`)

            }

        })
    }

    /**
     * Disconnect from the reader
     *
     * @memberof Reader
     */
    disconnect () {
        // Only act if the device and interface are active
        if (this.device && this.interface) {

            // Remove all event listeners
            this.readEndpoint.removeAllListeners ()
            this.writeEndpoint.removeAllListeners ()

            // Stop polling on the read endpoint
            if (this.readEndpoint.pollActive) {
                this.readEndpoint.stopPoll()
            }

            // Release the interface
            this.interface.release (true)

            // Close the device
            this.device.close ()

        }
    }

    /**
     * Create a command at address 255
     *
     * @param {byte} command The command to send.
     * @param {array} [data=[]] Extra data.
     * @return {Buffer} The final buffer
     * @memberof Reader
     */
    createCommand (command, data = []) {
        return addCrcToBuffer(Buffer.from ([0xff, command, ...data]))
    }

    /**
     * Write a buffer to the RFID device
     *
     * @param {byte} command The command to send.
     * @param {array} [data=[]] Extra data.
     * @return {Promise} The promise.
     * @memberof Reader
     */
    writeCommand (command, data = []) {

        return new Promise ((resolve, reject) => {

            // Create the command buffer, including the CRC bytes.
            const buffer = this.createCommand (command, data)

            // Set temporary callbacks.
            this.mSuccessCallback = resolve
            this.mErrorCallback = reject

            if (this.config.debug) {

                console.log('Write command:', buffer)

            } else {

                // Send it to the RFID module!
                this.writeEndpoint.transfer(buffer)

            }
        })

    }

    /**
     * Retrieve the current inventory.
     * @returns {Promise} The promise.
     */
    inventory () {
        return new Promise((resolve, reject) => {

            // Send the ISO Inventory command.
            this.writeCommand(Commands.ISOStandardHostCommand, [ISOStandardCommands.Inventory, 0x00]).then(response => {

                let output = {
                    status: Status.getFromValue(response.status),
                    raw: response.data,
                    tags: []
                }
                switch (response.status) {
                    case Status.OK:
                        // The response contains data, let's parse the tags into an array.
                        const inventory = this.parseInventory (response.data)
                        output.tags = inventory
                        break
                    case Status.NoTransponder:
                        // We did not receive any transponder data, return an empty array.
                        break
                }

                // Let's reset the radio frequency.
                this.resetRF ().finally(() => {
                    // Return the tags after the radio frequency has been sent.
                    resolve (output)
                })

            }).catch(result => {

                reject (result)

            })

        })
    }

    /**
     * Read multiple blocks of a tag.
     * @returns {Promise} The promise.
     */
    readMultipleBlocks(tag, firstDataBlock, noOfDataBlocks) {
        return new Promise ((resolve, reject) => {

            // Send the ISO ReadMultipleBlocks command.
            this.writeCommand(Commands.ISOStandardHostCommand, [].concat([ISOStandardCommands.ReadMultipleBlocks, 0x01], Array.from(tag), [firstDataBlock, noOfDataBlocks])).then(response => {

                switch (response.status) {
                    case Status.OK:
                        let data = response.data

                        resolve (data[data.length - 1])
                        break
                    default:
                        //reject("The received data was not correct.")
                }

            }).catch(result => {
                reject(result)
            })
            
        })
    }

    /**
     * Reset the radio frequency.
     * @returns {Promise} The promise.
     */
    resetRF () {
        return this.writeCommand(Commands.RFReset)
    }

    /**
     * Parse the current inventory buffer.
     * @param {Buffer} data The received inventory data buffer.
     * @returns 
     */
    parseInventory (data) {
        const inventory = []

        const count = data[0]

        const newBuffer = data.slice(1)

        for ( let i = 0; i < count; i++ ) {
            const tag = this.parseInventorySingle (newBuffer)
            if (tag !== null) {
                inventory.push(tag)
            }
        }

        return inventory
    }

    /**
     * Parse a single inventory entry from a buffer.
     * @param {Buffer} data The received single inventory buffer.
     * @returns 
     */
    parseInventorySingle (data) {
        // Transponder type.
        const type = data[0]

        // Discard the transponder type for further data processing.
        const newBuffer = data.slice(1)
        let identifier = null

        switch (type) {
            // Transponder is an ISO15693 type.
            case TransponderType.ISO15693:
                // Get an 8 byte long buffer containing the tag identifier.
                identifier = newBuffer.slice(1, 9)

                /* // Convert the transponder ID to a HEX string, the SDK does the same.
                const newTag = identifier */

                // Return the transponder ID.
                return identifier
            case TransponderType.ISO14443A:
                // Variable length based on response
                const length = newBuffer[0] === 0x04 ? 10 : 7

                // Get a "length" long buffer containing the tag identifier.
                identifier = newBuffer.slice(2, length + 2)

                // Return the transponder ID.
                return identifier
        }

        return null
    }

    /**
     * Handle incoming data.
     * 
     * @param {Buffer} data Incoming buffer data
     * @returns 
     */
    _handleData (data) {

        if (!data) {
            return
        }

        
        // Append the temporary buffer.
        this.tempBuffer = Buffer.from([...this.tempBuffer, ...data])

        // Try to parse the temporary buffer.
        const result = Response.tryParse (this.tempBuffer)
        // Get the response.
        const response = result.response

        switch (result.status) {
            // Successful buffer.
            case ParseStatus.Success:
                this.tempBuffer = []

                if (this.mSuccessCallback !== null) {

                    // Call the success callback.
                    this.mSuccessCallback (response)

                    // Reset the callback.
                    this.mSuccessCallback = null

                }
                break
            // Received an error.
            case ParseStatus.ChecksumError:
            case ParseStatus.FrameError:
                this.tempBuffer = []

                if (this.mErrorCallback !== null) {

                    // Call the error callback.
                    this.mErrorCallback (result)

                    // Reset the callback
                    this.mErrorCallback = null

                }
                break
        }
    }

    /**
     * Empty error handler.
     *
     * @param {*} error Error message
     * @memberof Reader
     */
    _handleError(error) {
        console.log('Error from reader:', error)
    }
}

exports = module.exports = Reader