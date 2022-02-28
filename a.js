// const result = require('./coverage/coverage-final.json');
const result = require('./package.json');
const fs = require("fs");

console.log('a.js:', JSON.stringify(result.total));
fs.readdir('./', (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});

fs.readFile('./coverage/coverage-final.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log("data: ", data);
})