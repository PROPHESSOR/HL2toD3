const vmf2json = require('./vmf2json');
const generatemap = require('./generatemap');

{
	console.info('#'.repeat(34));
	console.info('Half Life 2 =TO=> DooM 3 Converter');
	console.info('  ------- By  PROPHESSOR -------  ');
	console.info('#'.repeat(34));
	console.log('\n\n');

	try {
		console.log("Converting VMF -> JSON...");
		vmf2json();

		console.log("Convert successful!")
	} catch (e) {
		console.error("\n\n\n[FATAL ERROR]: Failed to convert VMF -> JSON!\n\n\n");
		console.error(e);
	}

	try {
		console.log("Generating DooM 3 .map file...");
		generatemap();

		console.log("Generate successful!")
	} catch (e) {
		console.error("\n\n\n[FATAL ERROR]: Failed to generate DooM 3 .map file!\n\n\n");
		console.error(e);
	}

}