const { join } = require('path');
const fs = require('fs');

const oneExp = new RegExp('^.+_one$');
const otherExp = new RegExp('^.+_other$');

const getDirectories = (source) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .filter((v) => v.name !== 'en')
        .map((dirent) => dirent.name);

const getDeepKeys = (obj) => {
    let keys = [];
    for (const key in obj) {
        if (!(oneExp.test(key) || otherExp.test(key))) {
            keys.push(key);
        }
        if (typeof obj[key] === 'object') {
            const subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map((subkey) => `${key}.${subkey}`));
        }
    }
    return keys;
};

const fullPath = join(__dirname, './en');
const languages = getDirectories('./src/locale');

fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error);
    files.forEach((file) => {
        const mainJson = JSON.parse(
            fs.readFileSync(join(fullPath, file)).toString()
        );
        languages.forEach((lang) => {
            const fullPathLanguage = join(__dirname, `./${lang}`);
            const comparedJson = JSON.parse(
                fs.readFileSync(join(fullPathLanguage, file)).toString()
            );

            const a = getDeepKeys(mainJson);
            const b = getDeepKeys(comparedJson);
            console.log('c' < 'd');


            if (a.sort().length !== b.sort().length) {
                const missing = b.filter((item) => a.indexOf(item) < 0);
                if (missing.join('').trim().length > 0) {
                    console.log(`File "${file}" In "${lang}" Is Missing The Following "${missing.length}" Keys: \n"${missing}"\n`)

                }
            }
        });
    });
});