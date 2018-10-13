/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const dictionary = {
    "concrete/concretefloor037c": "concrete/concretefloor037b",
    "concrete/concretefloor038c": "concrete/concretefloor038b",
    "metal/metalgrate014a": "metal/metalgrate016a",
    "nature/blenddirtgrass008b": "nature/blenddirtgrass008a",
    "nature/blendgrassgravel001b": "nature/blendgrassgravel001a",
    "nature/blendrockdirt005b_lowfrict": "nature/blendrockdirt006a",
    "nature/blendrockdirt008d": "nature/blendrockdirt007a",
    "nature/red_grass": "nature/grassfloor003a",
    "nature/water_wasteland002b": "base_wall/lfwall27d"
}

module.exports = texture => {
    // if(dictionary[texture]) console.log('patching', texture, '=>', dictionary[texture]);
    return dictionary[texture] || texture;
}