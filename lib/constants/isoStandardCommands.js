'use strict'

exports = module.exports = {}

/// 00h None
exports.None = 0x00

/// 01h Inventory
exports.Inventory = 0x01

/// 23h Read Multiple Blocks
exports.ReadMultipleBlocks = 0x23

/// 24h Write Multiple Blocks
exports.WriteMultipleBlocks = 0x24

/// 25h Select
exports.Select = 0x25

exports.getFromValue = value => {
    return Object.keys(exports).find(key => exports[key] == value)
}
