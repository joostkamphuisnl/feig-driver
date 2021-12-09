/**
 * Convert an array of decimals to a HEX string
 *
 * @param {Array} values array of decimal values
 * @return {string} HEX string
 * @memberof RFIDScanner
 */
function convertToHexString(values) {
    return Array.from(values)
      .map((val) => {
          let str = val.toString(16)
          if (str.length == 1) {
              str = "0" + str
          }
          return str
        })
      .join("")
      .toUpperCase()
}

exports = module.exports = convertToHexString