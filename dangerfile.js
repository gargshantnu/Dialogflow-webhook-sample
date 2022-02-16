// import { message, danger } from "danger";
const { message, danger } = require("danger");

// import { codeCoverage } from "danger-plugin-code-coverage";
// codeCoverage();

// import { istanbulCoverage } from "danger-plugin-istanbul-coverage"
const { istanbulCoverage } = require("danger-plugin-istanbul-coverage");

// schedule(istanbulCoverage()) // Use default configuration

schedule(istanbulCoverage({
  // Set a custom success message
  customSuccessMessage: "Congrats, coverage is good",

  // Set a custom failure message
  customFailureMessage: "Coverage is a little low, take a look",

  // How to sort the entries in the table
  entrySortMethod: "alphabetical", // || "least-coverage" || "most-coverage" || "largest-file-size" ||"smallest-file-size" || "uncovered-lines"

  // Add a maximum number of entries to display
  numberOfEntries: 10,

  // The location of the istanbul coverage file.
  coveragePath: "./coverage/coverage-final.json",

  // Which set of files to summarise from the coverage file.
  reportFileSet: "all", // || "modified" || "created" || "createdOrModified"

  // What to do when the PR doesn't meet the minimum code coverage threshold
  reportMode: "message", // || "warn" || "fail"

  // Minimum coverage threshold percentages. Compared against the cumulative coverage of the reportFileSet.
  threshold: {
    statements: 100,
    branches: 100,
    functions: 100,
    lines: 100,
  }
}))

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);
