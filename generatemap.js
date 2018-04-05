const fs = require('fs');

module.exports = () => {
	const json = require('./background01.json');

	let out = '';

	out += 'Version 2\n';
	out += '// entity 0\n';
	out += '{\n';
	out += '"classname" "worldspawn"\n';

	for(const solid of json.array) {
		out += `// primitive ${solid.id}\n`;
		out += `{\n`;
		for(const side of solid.array) {
			out += `\t// side ${side.id}\n`;
			out += `\tbrushDef3\n\t{\n`;
			out += `\t}\n`;
		}
	}

	out += '}\n';

	// console.log(out);

	fs.writeFileSync('background01.map', out, 'utf8');
}