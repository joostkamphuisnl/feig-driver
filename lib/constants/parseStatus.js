/** @type {object} Parse status */
const ParseStatus = {
    Success: 0,
    MoreDataNeeded: 1,
    ChecksumError: -1,
    FrameError: -2
}

module.exports = ParseStatus