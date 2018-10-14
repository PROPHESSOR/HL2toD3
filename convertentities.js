/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const dictionary =  {
    'light'(data) {
        return {
            classname: data.classname,
            origin: data.origin,
            _color: data._light.split(/\s+/).slice(0, -1).map(e => e / 255).join(' '),
            name: `${data.classname}_${data.id}`,
            lightradius: `${data._light.split(/\s+/)[3]} `.repeat(3).slice(0, -1),
            lightcenter: '0 0 0'
        }
    },
    'info_player_start'(data) {
        return {
            classname: data.classname,
            origin: data.origin,
            name: `${data.classname}_${data.id}`,
            angle: String(data.angles.split(/\s+/)[1])
        }
    },
    'env_cubemap'(data) {
        return {
            classname: 'light',
            origin: data.origin,
            _color: '0.6 0.36 0.27',
            name: `${data.classname}_${data.id}`,
            lightradius: '1200 1200 1200',
            lightcenter: '-48 -592 416',
            noshadows: "0",
            nospecular: "0",
            nodiffuse: "0",
            falloff: "0",
            texture: "lights/squarelight1sky"
        }
    },
    'info_lighting'(data) {
        return {
            classname: 'light',
            origin: data.origin,
            _color: '0.8 0.9 1.0',
            name: `${data.classname}_${data.id}`,
            lightradius: '100 100 100',
            lightcenter: '0 0 0'
        }
    }
};

module.exports = (entity, context) => {
    if(!dictionary[entity.classname]) return false;

    return dictionary[entity.classname](entity);
}