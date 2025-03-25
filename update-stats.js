const { Octokit } = require("@octokit/rest");
const fs = require("fs");

// Update these variables with your repository details
const owner = "ashutosh-kumar-incresco"; // Your GitHub username or organization
const repo = "your-repo-name";           // Your repository name

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Count commits since a given ISO date
async function countCommits(since) {
  let count = 0;
  let page = 1;
  while (true) {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      since,
      per_page: 100,
      page,
    });
    count += data.length;
    if (data.length < 100) break;
    page++;
  }
  return count;
}

// Count pull requests since a given ISO date
async function countPRs(since) {
  let count = 0;
  let page = 1;
  while (true) {
    const { data } = await octokit.search.issuesAndPullRequests({
      q: `repo:${owner}/${repo} is:pr created:>=${since}`,
      per_page: 100,
      page,
    });
    count += data.items.length;
    if (data.items.length < 100) break;
    page++;
  }
  return count;
}

async function main() {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const commitsYear = await countCommits(yearStart);
  const commitsMonth = await countCommits(monthStart);
  const commitsDay = await countCommits(dayStart);

  const prsYear = await countPRs(yearStart);
  const prsMonth = await countPRs(monthStart);
  const prsDay = await countPRs(dayStart);

  const content = `
### GitHub Stats

- **Commits:**
  - Today: **${commitsDay}**
  - This Month: **${commitsMonth}**
  - This Year: **${commitsYear}**

- **Pull Requests:**
  - Today: **${prsDay}**
  - This Month: **${prsMonth}**
  - This Year: **${prsYear}**
`;

  fs.writeFileSync("stats.md", content);
  console.log("Stats updated successfully.");
}

main();
