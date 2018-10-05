/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');
const parser = require('vmfparser');

module.exports = function (file) {
    const data = fs.readFileSync(file, 'utf8');
    return parser(data);
}