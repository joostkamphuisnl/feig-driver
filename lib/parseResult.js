const ParseStatus = require("./constants/parseStatus")

/**
 * Parse result
 *
 * @class ParseResult
 */
class ParseResult {
    /**
     * ParseResult constructor
     * @param {ParseStatus} status Status code
     * @param {Buffer} response Response buffer
     */
    constructor (status, response = null) {
        this.status = status
        this.response = response
    }

    /**
     * Succesful parse result.
     * @param {Buffer} response Response buffer
     * @returns {ParseResult} Parse result
     */
    static success (response) {
        return new ParseResult(ParseStatus.Success, response)
    }

    /**
     * More data is needed.
     * @returns {ParseResult} Parse result
     */
    static moreDataNeeded () {
        return new ParseResult(ParseStatus.MoreDataNeeded)
    }

    /**
     * Checksum error.
     * @param {Buffer} response Response buffer
     * @returns {ParseResult} Parse result
     */
    static checksumError (response) {
        return new ParseResult(ParseStatus.ChecksumError, response)
    }

    /**
     * Frame length doesn't match up.
     * @returns {ParseResult} Parse result
     */
    static frameError () {
        return new ParseResult(ParseStatus.FrameError)
    }
}

module.exports = ParseResult