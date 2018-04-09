const FILENAME = 'background01';

const fs = require('fs');

class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        const [x, y, z] = this;
        const {length} = this;

        if(!length) return this;

        return new Vec3(x / length, y / length, z / length);
    }

    selfnormalize() {
        this.x = this.x / this.length;
        this.y = this.y / this.length;
        this.z = this.z / this.length;
    }

    get length() {
        const [x, y, z] = this;
        return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }

    static from(value) {
        if(value instanceof Array) {
            return new Vec3(...value);
        } else {
            console.error('I can\'t parse Vec3 from this value!');
            return new Vec3(0, 0, 0);
        }
    }
}

/** Преобразовывает плоскость, заданную по 3-м точкам в уравнение этой плоскости
 * @param  {Vec3} vec1 - 1 точка
 * @param  {Vec3} vec2 - 2 точка
 * @param  {Vec3} vec3 - 3 точка
 * @returns {Array} [A, B, C, D]
 */
function convertVec3ToPlaneEquation(vec1, vec2, vec3) {
    const [x1, y1, z1] = vec1;
    const [x2, y2, z2] = vec2;
    const [x3, y3, z3] = vec3;

    /*
        = ((x - x1)  * (y2 - y1) * (z3 - z2)) + ((y - y1)  * (z2 - z1) * (x3 - x2)) + ((z - z1)  * (x2 - x1) * (y3 - y2))
        - ((x3 - x2) * (y2 - y1) * (z - z1))  - ((y3 - y2) * (z2 - z1) * (x - x1))  - ((z3 - z2) * (x2 - x1) * (y - y1))
    */

    const A =  y1 * (z2 - z3) + y2 * (z3 - z1) + y3 * (z1 - z2);
    const B =  z1 * (x2 - x3) + z2 * (x3 - x1) + z3 * (x1 - x2);
    const C =  x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);

    const D =-(x1 * (y2 * z3 - y3 * z2) + x2 * (y3 * z1 - y1 * z3) + x3 * (y1 * z2 - y2 * z1));

    return [A, B, C, D];
}

/** Рассчитывает растояние (нормали) от 0 до плоскости
 * @param  {array} equation - Вывод функции convertVec3ToPlaneEquation
 * @returns {number} - Растояние
 */
function calculateLengthNormalToPlane(equation) {
    const [A, B, C, D] = equation;
    const normal = (new Vec3(A, B, C)).normalize();
    // console.log(`equation: `, A, B, C, D);
    // console.log(`normal: `, ...normal);
    // console.log(`length: `, normal.length);
    return D
        /
        normal.length;
}

/** Парсит плейн на вектора
 * @param  {string} plane
 * @returns {Array} [Vec3, Vec3, Vec3]
 */
function parsePlane(plane) {
    const json = '[' + plane
        .replace(/\s/g, ', ')
        .replace(/\(/g, '[')
        .replace(/\)/g, ']')
        + ']';

    try {
        return JSON.parse(json);
    } catch(e) {
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
}

function hardcodePlayerStart() {
    return `// entity 1
{
    "classname" "info_player_start"
    "name" "info_player_start_1"
    "origin" "-3088 -3584 448"
    "angle" "180"
}`
}

module.exports = () => {
    debugger;
    const json = require(`./${FILENAME}.json`);

    let out = '';

    out += 'Version 2\n';
    out += '// entity 0\n';
    out += '{\n';
    out += '"classname" "worldspawn"\n';

    for (const solid of json.array) {
        out += `// primitive ${solid.id}\n`;
        out += `{\n`;
        out += `\tbrushDef3\n\t{\n`;
        for (const side of solid.array) {
            const [vec1, vec2, vec3] = parsePlane(side.plane);
            const equation = convertVec3ToPlaneEquation(vec1, vec2, vec3);
            const length = calculateLengthNormalToPlane(equation);
            const output = `${equation[0]} ${equation[1]} ${equation[2]} ${length}`; // (normal.x normal.y normal.z length)

            out += `\t\t( ${output} ) ( ( 0.015625 0 0 ) ( 0 0.015625 0 ) ) "textures/base_wall/lfwall27d" 0 0 0\n`;
        }
        out += `\t}\n`;
        out += '}\n';
    }
    out += '}\n';
    

    out += hardcodePlayerStart();

    // console.log(out);

    fs.writeFileSync(`${FILENAME}.map`, out, 'utf8');
}