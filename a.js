const result = require('./coverage/coverage-final.json');
const fs = require("fs");

console.log(JSON.stringify(result.total));
fs.readdir('./', (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});