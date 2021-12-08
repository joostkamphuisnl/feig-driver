const crc16 = require("./utils/crc16")
const ParseResult = require("./parseResult")
const Protocol = require("./constants/protocol")

/**
 * RFID Response
 *
 * @class Response
 */
class Response {
    constructor ({ frameLength, address, command, status, data, crc }) {
        this.frameLength = frameLength
        this.address = address
        this.command = command
        this.status = status
        this.data = data
        this.crc = crc
    }
    /**
     * Try and parse a received buffer.
     *
     * @static
     * @param {Buffer} span Buffer
     * @param {Protocol} [protocol=Protocol.Standard] What protocol are we using?
     * @return {ParseResult} The final result
     * @memberof Response
     */
    static tryParse (span, protocol = Protocol.Standard) {
        if (protocol == Protocol.Standard) {
            return this._tryParseStandardProtocolFrame(span)
        }

        if (protocol == Protocol.Advanced) {
            return this._tryParseAdvancedProtocolFrame(span)
        }

        throw `Protocol ${protocol} not supported!`
    }

    static _tryParseAdvancedProtocolFrame (span) {
        if (span.length < 8) {
            return ParseResult.moreDataNeeded ()
        }

        if (span[0] != 0x02) {
            return ParseResult.frameError ()
        }

        const lenHigh = span[1]
        const lenLow = span[2]
        const frameLength = ( lenHigh << 8 ) | lenLow

        if (span.length < frameLength) {
            return ParseResult.moreDataNeeded ()
        }

        const address = span[3]
        const command = span[4]
        const status = span[5]

        const crcLow = span[frameLength - 2]
        const crcHigh = span[frameLength - 1]
        const crc = ( crcHigh << 8 ) | crcLow

        // We calculate our own CRC.
        const calcCrc = crc16(Buffer.from(Array.from(span).slice(0, span.length - 2)))

        // Now slice the data to the actual useful data.
        const data = Buffer.from(Array.from(span).slice(6, frameLength - 2))

        // Create a new response object.
        const response = new Response ({
            frameLength,
            address,
            command,
            status,
            data,
            crc: calcCrc
        })

        // Let's check if the received CRC is not matching our CRC calculation.
        if (crc !== calcCrc) {
            return ParseResult.checksumError(response)
        }

        // We have received a valid response!
        return ParseResult.success(response)
    }

    /**
     * Try to parse the standard protocol frame from a Buffer.
     *
     * @static
     * @param {Buffer} span buffer
     * @return {ParseResult} The final result
     * @memberof Response
     */
    static _tryParseStandardProtocolFrame(span) {
        // Whoops, the buffer is too short. We need more data.
        if (span.length < 6) {
            return ParseResult.moreDataNeeded ()
        }

        const frameLength = span[0]

        // Whoops, the frame is too short.
        if (frameLength < 6) {
            return ParseResult.frameError ()
        }

        // The data is not long enough.
        if (span.length < frameLength) {
            return ParseResult.moreDataNeeded ()
        }

        const address = span[1]
        const command = span[2]
        const status = span[3]

        const crcLow = span[frameLength - 2]
        const crcHigh = span[frameLength - 1]
        const crc = ( crcHigh << 8 ) | crcLow

        // We calculate our own CRC.
        const calcCrc = crc16(Buffer.from(Array.from(span).slice(0, span.length - 2)))

        // Now slice the data to the actual useful data.
        const data = Buffer.from(Array.from(span).slice(4, frameLength - 2))

        // Create a new response object.
        const response = new Response ({
            frameLength,
            address,
            command,
            status,
            data,
            crc: calcCrc
        })

        // Let's check if the received CRC is not matching our CRC calculation.
        if (crc !== calcCrc) {
            return ParseResult.checksumError(response)
        }

        // We have received a valid response!
        return ParseResult.success(response)
    }
}

module.exports = Response