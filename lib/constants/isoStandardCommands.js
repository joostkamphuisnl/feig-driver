/** @type {object} ISO Standard commands to send to the RFID device */
const ISOStandardCommands = {
    /// 00h None
    None: 0x00,

    /// 01h Inventory
    Inventory: 0x01,

    /// 23h Read Multiple Blocks
    ReadMultipleBlocks: 0x23,

    /// 24h Write Multiple Blocks
    WriteMultipleBlocks: 0x24,

    /// 25h Select
    Select: 0x25,

    getFromValue: value => {
        return Object.keys(ISOStandardCommands).find(key => ISOStandardCommands[key] == value)
    }
}

module.exports = ISOStandardCommands