const fileName = './coverage-final.json';
// const fileName = './package.json';

const result = require(fileName);
const fs = require("fs");

console.log('a.js: ', JSON.stringify(result));
fs.readdir('./', (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log("data: ", data);
})