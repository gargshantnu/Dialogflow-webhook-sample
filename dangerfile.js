// import { message, danger } from "danger";
const {
  message,
  danger,
  warn
} = require("danger");

// import { codeCoverage } from "danger-plugin-code-coverage";
const {
  codeCoverage
} = require("danger-plugin-code-coverage");
codeCoverage();

// import { istanbulCoverage } from "danger-plugin-istanbul-coverage"
// const { istanbulCoverage } = require("danger-plugin-istanbul-coverage");

// schedule(istanbulCoverage()) // Use default configuration

// schedule(istanbulCoverage({
//   // Set a custom success message
//   customSuccessMessage: "Congrats, coverage is good",

//   // Set a custom failure message
//   customFailureMessage: "Coverage is a little low, take a look",

//   // How to sort the entries in the table
//   entrySortMethod: "alphabetical", // || "least-coverage" || "most-coverage" || "largest-file-size" ||"smallest-file-size" || "uncovered-lines"

//   // Add a maximum number of entries to display
//   numberOfEntries: 10,

//   // The location of the istanbul coverage file.
//   coveragePath: "./coverage/coverage-final.json",

//   // Which set of files to summarise from the coverage file.
//   reportFileSet: "all", // || "modified" || "created" || "createdOrModified"

//   // What to do when the PR doesn't meet the minimum code coverage threshold
//   reportMode: "message", // || "warn" || "fail"

//   // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
//   threshold: {
//     statements: 100,
//     branches: 100,
//     functions: 100,
//     lines: 100,
//   }
// }))

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR are: \n - " + modifiedMD);



// Check if package.json is modified but package-lock.json is modified or not
// ideally both should be modified
const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
if (packageChanged && !lockfileChanged) {
  // console.log("package-log not found");
  warn(`Changes were made to package.json, but not to package-lock.json - <i>'Perhaps you need to run \`npm install\`?'</i>`);
} else {
  // console.log("package-log found");
  message("Good work on committing package-lock as well");
}




const bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn('Big pull request, please keep small to make it easier to review');
}
if (danger.github.pr.deletions > 200) {
  message(`:tada: The PR removed ${danger.github.pr.deletions} lines.`);
}