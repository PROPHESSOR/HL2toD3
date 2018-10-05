/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const generatemap = require('./generatemap');
const vmfparser = require('./vmf2json');

const FILENAME = process.argv[2] || 'testroom'

{
	console.info('#'.repeat(34));
	console.info('Half Life 2 =TO=> DooM 3 Converter');
	console.info('  ------- By  PROPHESSOR -------  ');
	console.info('#'.repeat(34));
	console.log('\n');
	console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <name without extension>\n\n`);

	let json = null;

	try {
		console.log("Converting VMF -> JSON...");
		json = vmfparser(`${FILENAME}.vmf`);

		console.log("Convert successful!");
	} catch (e) {
		console.error("\n\n\n[FATAL ERROR]: Failed to convert VMF -> JSON!\n\n\n");
		console.error(e);
		return;
	}

	try {
		console.log("Generating DooM 3 .map file...");
		generatemap(json, FILENAME);

		console.log("Generate successful!")
	} catch (e) {
		console.error("\n\n\n[FATAL ERROR]: Failed to generate DooM 3 .map file!\n\n\n");
		console.error(e);
		return;
	}

}