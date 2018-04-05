const fs = require('fs');


module.exports = () => {
	const file = fs.readFileSync('./background01.vmf', 'utf8');

	const outfile = file
		// .replace(/(world)\s+/g, '"$1": ')
		.replace(/world\s+/g, '')
		.replace(/\n{/g, ' {')
		.replace(/\n\s*(solid|side|connections)/g, ',\n')
		.replace(/"\n(\s*)"/g, '",\n$1"')
		.replace(/"\s+"/g, '": "')
		.replace(/",\n(\s*){/g, '",\n$1"array": [\n$1\t{')
		.replace(/}\n(\s*)}/g, '}\n$1\t]\n$1}')
		.replace(/}\n\s*entity/, ']}\n\n================\n\nentity')

	const outfile1 = outfile.split(/=+/)[0];
	const outfile2 = "[\n" + outfile.split(/=+/)[1]
		.replace(/entity/g, '')
		.replace(/}\n\s*{/g, '},\n{')
		
		// .replace(/{\n(\s*)"OnTrigger": /g, '')
		// .replace(/"OnTrigger": "(.+)",\n(\s*)}/g, '"$2",\n$2]\n$2}')
		// .replace(/"OnTrigger": /g, '')
		// .replace(/^(\s*"[\w_,\d-]+",?)\n\s*}/g, '$1\n')
		+ "\n]"

	fs.writeFileSync('./background01.json', outfile1, 'utf8');
	fs.writeFileSync('./background01-entities.json', outfile2, 'utf8');
}