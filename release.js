const { analyzeCommits } = require('@semantic-release/commit-analyzer');
const { simpleGit } = require('simple-git');
const path = require('path');
const analyzeCommit = require('@semantic-release/commit-analyzer/lib/analyze-commit');

const git = simpleGit(__dirname)

function gitLog(config) {
  return new Promise((resolve) => git.log(config, (_, { all }) => resolve(all)));
}

async function main() {
  const commits = await gitLog({ file: path.join(__dirname, 'shapes', 'example.shaclc') });

  const analysis = await analyzeCommits({}, {
    commits,
    logger: console
  })

  console.log(analysis);
}

main();

// const l = git.log({
//   file: path.join(__dirname, 'shapes', 'example.shaclc'),
// }, console.log)

// console.log(l)

// console.log(
//   analyzeCommits({}, {
//     commits: [],
//     cwd: process.cwd(),
//   })
// )
