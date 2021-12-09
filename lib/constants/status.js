'use strict'

exports = module.exports = {}

/// 00h OK / Success
exports.OK = 0x00

/// 01h No Transponder (Success)
exports.NoTransponder = 0x01

/// 02h Data False
exports.DataFalse = 0x02

/// 03h Write Error
exports.WriteError = 0x03

/// 04h Address Error
exports.AddressError = 0x04

/// 05h Wrong Transponder Type
exports.WrongTransponderType = 0x05

/// 08h Authentication Error
exports.AuthenticationError = 0x08

/// 0Bh Collision Error
exports.CollisionError = 0x0B

/// 0Eh General Error
exports.GeneralError = 0x0E

/// 10h EEPROM Failure
exports.EEPROMFailure = 0x10

/// 11h Parameter Range Error
exports.ParameterRangeError = 0x11

/// 13h Login Request
exports.LoginRequest = 0x13

/// 14h Login Error
exports.LoginError = 0x14

/// 15h Read Protect
exports.ReadProtect = 0x15

/// 16h Write Protect
exports.WriteProtect = 0x16

/// 17h Firmware Activation Required
exports.FirmwareActivationRequired = 0x17

/// 31h No SAM Detected
exports.NoSAMDetected = 0x31

/// 32h Requested SAM Is Not Activated
exports.RequestedSAMIsNotActivated = 0x32

/// 33h Requested SAM Is Already Activated
exports.RequestedSAMIsAlreadyActivated = 0x33

/// 34h Requested Protocol Not Supported By SAM
exports.RequestedProtocolNotSupportedBySAM = 0x34

/// 35h SAM Communication Error
exports.SAMCommunicationError = 0x35

/// 36h SAM Timeout
exports.SAMTimeout = 0x36

/// 37h SAM Unsupported Baudrate
exports.SAMUnsupportedBaudrate = 0x37

/// 80h Unknown Command
exports.UnknownCommand = 0x80

/// 81h Length Error
exports.LengthError = 0x81

/// 82h Command Not Available
exports.CommandNotAvailable = 0x82

/// 83h RF Communication Error
exports.RFCommunicationError = 0x83

/// 84h RF Warning
exports.RFWarning = 0x84

/// 85h EPC Error
exports.EPCError = 0x85

/// 93h Data Buffer Overflow
exports.DataBufferOverflow = 0x93

/// 94h More Data
exports.MoreData = 0x94

/// 95h ISO 15693 Error
exports.ISO15693Error = 0x95

/// 96h ISO 14443 Error
exports.ISO14443Error = 0x96

/// 97h Crypto Processing Error
exports.CryptoProcessingError = 0x97

/// F1h Hardware Warning
exports.HardwareWarning = 0xF1

exports.getFromValue = value => {
    return Object.keys(exports).find(key => exports[key] == value)
}