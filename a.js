const result = require('./coverage/coverage-final.json');
const fs = require("fs");

console.log('a.js:',JSON.stringify(result.total));
fs.readdir('./', (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});