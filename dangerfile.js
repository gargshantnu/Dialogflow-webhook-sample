const {
  message,
  danger,
  warn,
  markdown,
} = require("danger");


// if (danger.github.pr.title.toLowerCase().includes("[wip]")) {
//   warn("PR is classed as Work in Progress")
// }

// // const createdFiles = danger.git.created_files.join(", ");
// // message("Created Files in this PR are: " + createdFiles);

// // const updatedFiles = danger.git.modified_files.join(", ");
// // message("Updated Files in this PR are: " + updatedFiles);



// // Check if package.json is modified but package-lock.json is modified or not
// // ideally both should be modified
// const packageChanged = danger.git.modified_files.includes('package.json');
// const lockfileChanged = danger.git.modified_files.includes('package-lock.json');
// if (packageChanged && !lockfileChanged) {
//   // console.log("package-log not found");
//   warn(`Changes were made to package.json, but not to package-lock.json - <i>'Perhaps you need to run \`npm install\`?'</i>`);
// } else {
//   // console.log("package-log found");
//   message("Good work on committing package-lock as well :thumbsup:");
// }




// const bigPRThreshold = 600;
// if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
//   warn('Your PR has over 500 lines of code :scream: Try to break it up into separate PRs if possible :thumbsup:');
// }
// if (danger.github.pr.deletions > 200) {
//   message(`:tada: The PR removed ${danger.github.pr.deletions} lines. :clap:`);
// }


// // console.log("danger.git.modified_files ", danger.git.modified_files);
// const hasAppChanges = danger.git.modified_files.length > 0;
// const testChanges = danger.git.modified_files.filter(filepath =>
//   filepath.includes('test'),
// );
// const hasTestChanges = testChanges.length > 0;

// // Warn if there are code changes, but not tests
// if (hasAppChanges && !hasTestChanges) {
//   warn(
//     "Remember to write tests in case you have added a new API or fixed a bug. Feel free to ask for help if you need it :thumbsup:"
//   );
// }


// const mergeCommits = danger.github.commits.filter(({
//   commit
// }) => {
//   return commit.message.includes(`Merge branch 'master'`);
// });
// // console.log("mergeCommits ", mergeCommits);
// if (mergeCommits.length) {
//   warn("Please rebase to get rid of the merge commits in this PR 🙏");
// }

// // TODO add check here
// // console.log("github.requested_reviewers ", danger.github.requested_reviewers)
// if(!danger.github.requested_reviewers.users.length && !danger.github.requested_reviewers.teams.length ){
//   warn("Please add right persons as reviewers :exclamation:")
// }

// if (danger.github.pr.body.length == 0) {
//   warn("Please add a description to your PR to make it easier to review :ok_hand:")
// }


// const {
//   default: jiraIssue
// } = require("danger-plugin-jira-issue");

// jiraIssue({
//   key: ["TD", "FW"],
//   url: "https://kommunicate.atlassian.net/browse",
//   // emoji: ":paperclip:",
//   format(emoji, jiraUrls) {
//     // Optional Formatter
//     return `Jira Link - ${emoji} ${jiraUrls}`;
//   },
//   fail_on_warning: false
//   // location: "title" // Optional location, either 'title' or 'branch'
// });


const newCoverageReport = require('./coverage/coverage-summary.json');
// const masterCoverageReport = require('./newCoverage.json');
const newCoverage = newCoverageReport.total;
// const masterCoverage = masterCoverageReport.total;

// const functionCoverage = `${"Functions".padEnd(10)} ${"?".padStart(10)} ${newCoverage.functions.pct.padStart(10)} ${"2".padStart(10)}\n`;
// const lineCoverage = `${"Lines".padEnd(10)} ${"?".padStart(10)} ${newCoverage.lines.pct.padStart(10)} ${"2".padStart(10)}\n`;
// const statementCoverage = `${"Statement".padEnd(10)} ${"?".padStart(10)} ${newCoverage.statements.pct.padStart(10)} ${"2".padStart(10)}\n`;

const functionCoverage = `${"Functions".padEnd(10)} ${newCoverage.functions.pct.padStart(10)}\n`;
const lineCoverage = `${"Lines".padEnd(10)} ${newCoverage.lines.pct.padStart(10)}\n`;
const statementCoverage = `${"Statement".padEnd(10)} ${newCoverage.statements.pct.padStart(10)}\n`;

const prNumber = `#${danger.github.pr.number.toString()}`.padStart(10);


// const msg = "\n ```diff \n @@          Coverage Difference          @@"
//   + `\n ${"##".padEnd(9)} ${"master".padStart(10)} ${prNumber} ${"+/-".padStart(10)}\n========== ========== ========== ==========\n` 
//   + functionCoverage
//   + lineCoverage
//   + statementCoverage + "========== ========== ========== ========== \n"
//   + " ```";

const msg = "\n ```diff \n @@     Coverage Difference     @@"
  + `\n ${"##".padEnd(9)} ${prNumber} \n========== ==========\n` 
  + functionCoverage
  + lineCoverage
  + statementCoverage + "========== ==========\n"
  + "```";


markdown(`## Code Coverage ${msg}`);