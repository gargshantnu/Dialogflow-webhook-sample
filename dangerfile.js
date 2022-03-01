const {
  message,
  danger,
  warn
} = require("danger");

// const {
//   codeCoverage
// } = require("danger-plugin-code-coverage");
// codeCoverage();

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


if (danger.github.pr.title.toLowerCase().includes("[wip]")) {
  warn("PR is classed as Work in Progress")
}

const createdFiles = danger.git.created_files.join(", ");
message("Created Files in this PR are: " + createdFiles);

const updatedFiles = danger.git.modified_files.join(", ");
message("Updated Files in this PR are: " + updatedFiles);



// Check if package.json is modified but package-lock.json is modified or not
// ideally both should be modified
const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
if (packageChanged && !lockfileChanged) {
  // console.log("package-log not found");
  warn(`Changes were made to package.json, but not to package-lock.json - <i>'Perhaps you need to run \`npm install\`?'</i>`);
} else {
  // console.log("package-log found");
  message("Good work on committing package-lock as well :thumbsup:");
}




const bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn('Your PR has over 500 lines of code :scream: Try to break it up into separate PRs if possible :thumbsup:');
}
if (danger.github.pr.deletions > 200) {
  message(`:tada: The PR removed ${danger.github.pr.deletions} lines. :clap:`);
}


// console.log("danger.git.modified_files ", danger.git.modified_files);
const hasAppChanges = danger.git.modified_files.length > 0;
const testChanges = danger.git.modified_files.filter(filepath =>
  filepath.includes('test'),
);
const hasTestChanges = testChanges.length > 0;

// Warn if there are code changes, but not tests
if (hasAppChanges && !hasTestChanges) {
  warn(
    "Remember to write tests in case you have added a new API or fixed a bug. Feel free to ask for help if you need it :thumbsup:"
  );
}


const mergeCommits = danger.github.commits.filter(({
  commit
}) => {
  return commit.message.includes(`Merge branch 'master'`);
});
// console.log("mergeCommits ", mergeCommits);
if (mergeCommits.length) {
  warn("Please rebase to get rid of the merge commits in this PR 🙏");
}

// TODO add check here
// console.log("github.requested_reviewers ", danger.github.requested_reviewers)
if(!danger.github.requested_reviewers.users.length && !danger.github.requested_reviewers.teams.length ){
  warn("Please add right persons as reviewers :exclamation:")
}

if (danger.github.pr.body.length == 0) {
  warn("Please add a description to your PR to make it easier to review :ok_hand:")
}


const {
  default: jiraIssue
} = require("danger-plugin-jira-issue");

jiraIssue({
  key: ["TD", "FW"],
  url: "https://kommunicate.atlassian.net/browse",
  // emoji: ":paperclip:",
  format(emoji, jiraUrls) {
    // Optional Formatter
    return `Jira Link - ${emoji} ${jiraUrls}`;
  },
  fail_on_warning: false
  // location: "title" // Optional location, either 'title' or 'branch'
});


const result = require('./coverage/coverage-final.json');
const coverage = JSON.stringify(result.total)
console.log("code: ", result);
console.log("code coverage: ", coverage);
message(`coverage ${coverage}`);

const msg = " \n ```diff \n @@            Coverage Diff            @@ \n ##             master     #428   +/-   ## \n ========================================= \n   Coverage          ?   27.89%            \n ========================================= \n   Files             ?      239            \n   Lines             ?    11368            \n   Branches          ?        0            \n ========================================= \n   Hits              ?     3171            \n   Misses            ?     8197            \n   Partials                   0            \n ```";
message(`msg ${msg}`);
// const fs = require("fs");
// fs.readdir('./', (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// });

// fs.readFile("./coverage/coverage-final.json", 'utf8', (err, data) => {
//   if (err) {
//       console.error(err)
//       return
//   }
//   console.log("danger data: ", data);
// })