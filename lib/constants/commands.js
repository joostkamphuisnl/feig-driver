'use strict'

exports = module.exports = {}

/// 00h None
exports.None = 0x00

/// 52h Baud Rate Detection
exports.BaudRateDetection = 0x52

/// 55h Start Flash Loader
exports.StartFlashLoader = 0x55

/// 63h CPU Reset
exports.CPUReset = 0x63

/// 65h Get Software Version
exports.GetSoftwareVersion = 0x65

/// 66h Get Reader Info
exports.GetReaderInfo = 0x66

/// 69h RF Reset
exports.RFReset = 0x69

/// 6Ah RF Output On/Off
exports.RFOutputOnOff = 0x6A

/// 72h Set Output
exports.SetOutput = 0x72

/// A0h Reader Login
exports.ReaderLogin = 0xA0

/// 80h Read Configuration
exports.ReadConfiguration = 0x80

/// 81h Write Configuration
exports.WriteConfiguration = 0x81

/// 82h Save Configuration
exports.SaveConfiguration = 0x82

/// 83h Set Default Configuration
exports.SetDefaultConfiguration = 0x83

/// A2h Write Mifare Reader Keys
exports.WriteMifareReaderKeys = 0xA2

/// B0h ISO Standard Host Command
exports.ISOStandardHostCommand = 0xB0

/// B2h ISO14443 Special Host Command
exports.ISO14443SpecialHostCommand = 0xB2

/// BDh ISO14443A Transparent Command
exports.ISO14443ATransparentCommand = 0xBD

/// BEh ISO14443B Transparent Command
exports.ISO14443BTransparentCommand = 0xBE

/// BCh Command Queue
exports.CommandQueue = 0xBC

exports.getFromValue = value => {
    return Object.keys(exports).find(key => exports[key] == value)
}