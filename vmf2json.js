const fs = require('fs');

module.exports = (FILENAME) => {
    const file = fs.readFileSync(`./${FILENAME}.vmf`, 'utf8');

    const outfile = file
        // .replace(/(world)\s+/g, '"$1": ')
        .replace(/world\s+/g, '')
        .replace(/[\x0d]/g, '')
        .replace(/\n{/g, ' {')
        .replace(/\n\s*(solid|side|connections)/g, ',\n')
        .replace(/" +"/g, '": "')
        .replace(/"\n(\s+)"/g, '",\n$1"')
        .replace(/",\n(\s*){/g, '",\n$1"array": [\n$1\t{')
        .replace(/}\n(\s*)}/g, '}\n$1\t]\n$1}')
        .replace(/}\n(\s*)}/g, '}\n$1\t]\n$1}')
        .replace(/editor\n\s*{[\n\s\S]+?}/g, '') // Избавление от поля editor
        .replace(/}\n+\s*entity/, ']}\n\n================\n\nentity')
        
    const split = outfile.split(/=+/);
    fs.writeFileSync(`./${FILENAME}.json`, split[0], 'utf8');

    if(!split[1]) return;

    debugger;

    const outfile2 = "[\n" + split[1]
        .replace(/entity/g, '')
        .replace(/}\n\s*{/g, '},\n{')
        
        // .replace(/{\n(\s*)"OnTrigger": /g, '')
        // .replace(/"OnTrigger": "(.+)",\n(\s*)}/g, '"$2",\n$2]\n$2}')
        // .replace(/"OnTrigger": /g, '')
        // .replace(/^(\s*"[\w_,\d-]+",?)\n\s*}/g, '$1\n')
        + "\n]"

    fs.writeFileSync(`./${FILENAME}-entities.json`, outfile2, 'utf8');

    return true;
}