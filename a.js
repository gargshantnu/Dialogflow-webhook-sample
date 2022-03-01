const fileName = './coverage-final.json';
// const fileName = './package.json';

const result = require(fileName);
const fs = require("fs");

// console.log('a.js: ', JSON.stringify(result));
// fs.readdir('./coverage', (err, files) => {
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// fs.readFile(fileName, 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log("data: ", data);
// })

let newCoverageReport, masterCoverageReport;

if (fs.existsSync('./coverage/coverage-summary.json')) {
    newCoverageReport = require('./coverage/coverage-summary.json');
}

if (fs.existsSync('./coverage.json')) {
    masterCoverageReport = require('./coverage.json');
}

const newCoverage = newCoverageReport?.total;
const masterCoverage = masterCoverageReport?.total;

console.log("newCoverage: ", newCoverage);
console.log("masterCoverage: ", masterCoverage);
// const functionCoverage = `${"Functions".padEnd(10)} ${"?".padStart(10)} ${newCoverage?.functions?.pct.padStart(10)} ${"2".padStart(10)}\n`;
// const lineCoverage = `${"Lines".padEnd(10)} ${"?".padStart(10)} ${newCoverage?.lines?.pct.padStart(10)} ${"2".padStart(10)}\n`;
// const statementCoverage = `${"Statement".padEnd(10)} ${"?".padStart(10)} ${newCoverage?.statements?.pct.padStart(10)} ${"2".padStart(10)}\n`;

// const prNumber = `#${danger.github.pr.number.toString()}`.padStart(10);

const functionCoverageDiff = `${(newCoverage?.functions?.pct - masterCoverage?.functions?.pct).toString()}`.padStart(10);
// const prNumber = `#${danger.github.pr.number.toString()}`.padStart(10);
// const prNumber = `#${danger.github.pr.number.toString()}`.padStart(10);

// const msg = "\n ```diff \n @@          Coverage Difference          @@"
//   + `\n ${"##".padEnd(9)} ${"master".padStart(10)} ${prNumber} ${"+/-".padStart(10)}\n========== ========== ========== ==========\n` 
//   + functionCoverage
//   + lineCoverage
//   + statementCoverage + "========== ========== ========== ========== \n"
//   + " ```";

console.log("functionCoverageDiff: ", functionCoverageDiff)