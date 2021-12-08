/** @type {object} Response status */
const Status = {
    /// 00h OK / Success
    OK: 0x00,

    /// 01h No Transponder (Success)
    NoTransponder: 0x01,

    /// 02h Data False
    DataFalse: 0x02,

    /// 03h Write Error
    WriteError: 0x03,

    /// 04h Address Error
    AddressError: 0x04,

    /// 05h Wrong Transponder Type
    WrongTransponderType: 0x05,

    /// 08h Authentication Error
    AuthenticationError: 0x08,

    /// 0Bh Collision Error
    CollisionError: 0x0B,

    /// 0Eh General Error
    GeneralError: 0x0E,

    /// 10h EEPROM Failure
    EEPROMFailure: 0x10,

    /// 11h Parameter Range Error
    ParameterRangeError: 0x11,

    /// 13h Login Request
    LoginRequest: 0x13,

    /// 14h Login Error
    LoginError: 0x14,

    /// 15h Read Protect
    ReadProtect: 0x15,

    /// 16h Write Protect
    WriteProtect: 0x16,

    /// 17h Firmware Activation Required
    FirmwareActivationRequired: 0x17,

    /// 31h No SAM Detected
    NoSAMDetected: 0x31,

    /// 32h Requested SAM Is Not Activated
    RequestedSAMIsNotActivated: 0x32,

    /// 33h Requested SAM Is Already Activated
    RequestedSAMIsAlreadyActivated: 0x33,

    /// 34h Requested Protocol Not Supported By SAM
    RequestedProtocolNotSupportedBySAM: 0x34,

    /// 35h SAM Communication Error
    SAMCommunicationError: 0x35,

    /// 36h SAM Timeout
    SAMTimeout: 0x36,

    /// 37h SAM Unsupported Baudrate
    SAMUnsupportedBaudrate: 0x37,

    /// 80h Unknown Command
    UnknownCommand: 0x80,

    /// 81h Length Error
    LengthError: 0x81,

    /// 82h Command Not Available
    CommandNotAvailable: 0x82,

    /// 83h RF Communication Error
    RFCommunicationError: 0x83,

    /// 84h RF Warning
    RFWarning: 0x84,

    /// 85h EPC Error
    EPCError: 0x85,

    /// 93h Data Buffer Overflow
    DataBufferOverflow: 0x93,

    /// 94h More Data
    MoreData: 0x94,

    /// 95h ISO 15693 Error
    ISO15693Error: 0x95,

    /// 96h ISO 14443 Error
    ISO14443Error: 0x96,

    /// 97h Crypto Processing Error
    CryptoProcessingError: 0x97,

    /// F1h Hardware Warning
    HardwareWarning: 0xF1,

    getFromValue: value => {
        return Object.keys(Status).find(key => Status[key] == value)
    }
}

module.exports = Status