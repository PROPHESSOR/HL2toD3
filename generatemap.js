/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const fs = require('fs');
const convertEntities = require('./convertentities');
const patchTextures = require('./texturepatcher');

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
    } catch (e) {
        console.warn(`Can't parse plane! ${plane}`);
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
}

function toMAP(object) {
    return JSON.stringify(object, null, 4).replace(/[:,]/g, '');
}

function parseUV(str) {
    // return '0 0 0';
    // return `${0.015625 / 4} 0 0`;
    if(!str) return '0.015625 0 0';
    const scale = Number(str.split(/\s+/)[4]);
    const uv = str.split(/[\[\]]/)[1];
    // console.log('uv', uv);
    const values = uv.split(/\s+/).map(e => Number(e));
    // console.log('values', values);
    // values[0] *= values[3];
    // values[1] *= values[3];
    // values[2] *= values[3] * scale;
    return `${values[0] * scale / 16} ${values[1] * scale / 16} ${values[3]}`; // FIXME:
}

function generateMaterial(textures) {
    let material = '';

    for(const _texture of textures) {
        if(!_texture) continue;
        if(/tools/.test(_texture)) continue;
        const texture = `textures/${_texture}`;
        material +=
`${texture} {
    qer_editorimage ${texture}
    diffusemap ${texture}
}

`
    }

    return material;
}

module.exports = (json, FILENAME) => {
    let out = '';

    out += 'Version 2\n';
    out += '// entity 0\n';
    out += '{\n';
    out += '"classname" "worldspawn"\n';

    const textures = new Set();

    for (const solid of json.world.solid) {
        out += `// primitive ${solid.id}\n`;
        out += `{\n`;
        out += `\tbrushDefByHL2toD3\n\t{\n`;
        for (const side of solid.side) {
            const [vec1, vec2, vec3] = parsePlane(side.plane);

            out += `\t\t( ${vec1.join(' ')} ) ( ${vec2.join(' ')} ) ( ${vec3.join(' ')} ) ( ( ${'0.015625 0 0'||parseUV(side.uaxis)} ) ( ${'0 0.015625 0'||parseUV(side.vaxis)} ) ) "textures/${patchTextures(side.material) || 'base_wall/lfwall27d'}" 0 0 0\n`;
            textures.add(patchTextures(side.material));
        }
        out += `\t}\n`;
        out += '}\n';
    }

    for (const entity of json.entity) {
        // if(entity.classname !== 'func_detail') continue;
        if (!(entity.solid instanceof Array)) continue;

        for (const solid of entity.solid) {
            out += `// primitive ${entity.id}_${solid.id}\n`;
            out += `{\n`;
            out += `\tbrushDefByHL2toD3\n\t{\n`;
            for (const side of solid.side) {
                const [vec1, vec2, vec3] = parsePlane(side.plane);

                out += `\t\t( ${vec1.join(' ')} ) ( ${vec2.join(' ')} ) ( ${vec3.join(' ')} ) ( ( ${'0.015625 0 0'||parseUV(side.uaxis)} ) ( ${'0 0.015625 0'||parseUV(side.vaxis)} ) ) "textures/${patchTextures(side.material) || 'textures/base_wall/lfwall27d'}" 0 0 0\n`;
                textures.add(patchTextures(side.material));
            }
            out += `\t}\n`;
            out += '}\n';
        }
    }
    out += '}\n';


    for (const entity of json.entity) {
        const tmp = convertEntities(entity);
        if(!tmp) continue;

        out += `\n// entity ${entity.id}\n`;
        out += toMAP(tmp);
        out += '\n';
    }

    fs.writeFileSync(`${FILENAME}.mtr`, generateMaterial(textures));

    fs.writeFileSync(`${FILENAME}.map`, out, 'utf8');
}