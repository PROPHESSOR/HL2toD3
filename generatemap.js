/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');

/** Парсит плейн на вектора
 * @param  {string} plane
 * @returns {Array} [Vec3, Vec3, Vec3]
 */
function parsePlane(plane) {
    const json = '[' + plane
        .replace(/\s+/g, ', ')
        .replace(/\(/g, '[')
        .replace(/\)/g, ']')
        + ']';

    try {
        return JSON.parse(json);
    } catch(e) {
        console.warn(`Can't parse plane! ${plane}`);
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
}

function hardcodePlayerStart() {
    return `// entity 1
{
    "classname" "info_player_start"
    "name" "info_player_start_1"
    "origin" "-2176 88 80"
    "angle" "180"
}`
}

module.exports = (json, FILENAME) => {
    let out = '';

    out += 'Version 2\n';
    out += '// entity 0\n';
    out += '{\n';
    out += '"classname" "worldspawn"\n';

    for (const solid of json.world.solid) {
        out += `// primitive ${solid.id}\n`;
        out += `{\n`;
        out += `\tbrushDefByHL2toD3\n\t{\n`;
        for (const side of solid.side) {
            const [vec1, vec2, vec3] = parsePlane(side.plane);

            out += `\t\t( ${vec1.join(' ')} ) ( ${vec2.join(' ')} ) ( ${vec3.join(' ')} ) ( ( 0.015625 0 0 ) ( 0 0.015625 0 ) ) "base_wall/lfwall27d" 0 0 0\n`;
        }
        out += `\t}\n`;
        out += '}\n';
    }
    out += '}\n';
    

    out += hardcodePlayerStart();

    fs.writeFileSync(`${FILENAME}.map`, out, 'utf8');
}