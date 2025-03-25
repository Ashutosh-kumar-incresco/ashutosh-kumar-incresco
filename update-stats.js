const { Octokit } = require("@octokit/rest");
const fs = require("fs");

// 1. Update with your actual GitHub username/org and repo name
const owner = "ashutosh-kumar-incresco";
const repo = "your-repo-name";

// 2. Create an authenticated Octokit instance
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// 3. A helper function to list all commits since a certain date.
//    If 'since' is null, it fetches the entire history on the default branch.
async function countCommits(since = null) {
  let count = 0;
  let page = 1;

  while (true) {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      since,              // If this is null, it won't filter by date.
      per_page: 100,
      page,
      // sha: "main",    // Uncomment and specify if your default branch isn't "main" or "master".
    });

    count += data.length;

    // If we got fewer than 100 commits, we know we've reached the end
    if (data.length < 100) break;
    page++;
  }

  return count;
}

// 4. Similarly, a helper function for counting PRs created since a date
async function countPRs(since = null) {
  let count = 0;
  let page = 1;

  while (true) {
    // Building the query
    // "repo:owner/repo is:pr created:>=YYYY-MM-DD"
    // If 'since' is null, skip adding created:>= to fetch all PRs
    const dateQuery = since ? ` created:>=${since}` : "";
    const query = `repo:${owner}/${repo} is:pr${dateQuery}`;

    const { data } = await octokit.search.issuesAndPullRequests({
      q: query,
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

  // 5. Count commits
  const commitsAllTime = await countCommits(null); // No 'since' -> entire history
  const commitsYear = await countCommits(yearStart);
  const commitsMonth = await countCommits(monthStart);
  const commitsDay = await countCommits(dayStart);

  // 6. Count PRs
  const prsAllTime = await countPRs(null); // entire history
  const prsYear = await countPRs(yearStart);
  const prsMonth = await countPRs(monthStart);
  const prsDay = await countPRs(dayStart);

  // 7. Prepare markdown output
  const content = `
### GitHub Stats

- **Commits**:
  - All-Time: **${commitsAllTime}**
  - This Year: **${commitsYear}**
  - This Month: **${commitsMonth}**
  - Today: **${commitsDay}**

- **Pull Requests**:
  - All-Time: **${prsAllTime}**
  - This Year: **${prsYear}**
  - This Month: **${prsMonth}**
  - Today: **${prsDay}**
`;

  // 8. Write the stats to stats.md
  fs.writeFileSync("stats.md", content);
  console.log("Stats updated successfully.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
