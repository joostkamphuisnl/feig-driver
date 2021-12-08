'use strict'

/** @type {object} Commands to send to the RFID device */
const Commands = {
    /// 00h None
    None: 0x00,

    /// 52h Baud Rate Detection
    BaudRateDetection: 0x52,

    /// 55h Start Flash Loader
    StartFlashLoader: 0x55,

    /// 63h CPU Reset
    CPUReset: 0x63,

    /// 65h Get Software Version
    GetSoftwareVersion: 0x65,

    /// 66h Get Reader Info
    GetReaderInfo: 0x66,

    /// 69h RF Reset
    RFReset: 0x69,

    /// 6Ah RF Output On/Off
    RFOutputOnOff: 0x6A,

    /// 72h Set Output
    SetOutput: 0x72,

    /// A0h Reader Login
    ReaderLogin: 0xA0,

    /// 80h Read Configuration
    ReadConfiguration: 0x80,

    /// 81h Write Configuration
    WriteConfiguration: 0x81,

    /// 82h Save Configuration
    SaveConfiguration: 0x82,

    /// 83h Set Default Configuration
    SetDefaultConfiguration: 0x83,

    /// A2h Write Mifare Reader Keys
    WriteMifareReaderKeys: 0xA2,

    /// B0h ISO Standard Host Command
    ISOStandardHostCommand: 0xB0,

    /// B2h ISO14443 Special Host Command
    ISO14443SpecialHostCommand: 0xB2,

    /// BDh ISO14443A Transparent Command
    ISO14443ATransparentCommand: 0xBD,

    /// BEh ISO14443B Transparent Command
    ISO14443BTransparentCommand: 0xBE,

    /// BCh Command Queue
    CommandQueue: 0xBC,

    getFromValue: value => {
        return Object.keys(Commands).find(key => Commands[key] == value)
    }
}

module.exports = Commands