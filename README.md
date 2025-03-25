# Welcome to My Project!

<img src="https://www.digitalsolutionservices.com/img/services/web%20development.gif" alt="Coding">
<h1 align="center">Hi 👋, I'm Ashutosh Kumar</h1>
<h3 align="center">👨‍💻 Enthusiastic Software Developer</h3>
<h3 align="center">💻 Constantly acquiring new tech skills to drive innovation in project development.</h3>
<img align="right" width="400" src="https://media.tenor.com/qJ5evVs-_uUAAAAC/coding.gif" alt="Coding">

<p align="left">
  <img src="https://komarev.com/ghpvc/?username=ashutosh-kumar-incresco&label=Profile%20views&color=0e75b6&style=flat" alt="ashutosh-kumar-incresco" />
</p>

- 🌱 Currently exploring **Next.js and React Native** for continuous learning.
- 💬 Let's talk about **React, JavaScript, TypeScript** and Data Structures & Algorithms.
- 📫 How to reach me: **ashuvinayak1508@gmail.com**
- 🌟 Always eager to dive into the latest innovations and take on exciting new projects!

<h3 align="left">Connect with me:</h3>
<p align="left">
  <a href="https://www.linkedin.com/in/ashutosh-kumar-dev/" target="blank">
    <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator//master/src/images/icons/Social/linked-in-alt.svg" alt="dev-Ashutosh-kumar" height="30" width="40" />
  </a>
  <a href="https://www.instagram.com/ashu_vinayak1/" target="blank">
    <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="ashu_vinayak1" height="30" width="40" />
  </a>
  <a href="https://leetcode.com/Ashu_vinayak/" target="blank">
    <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="Ashu_vinayak" height="30" width="40" />
  </a>
</p>

## 💻 Tech Stack

![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white) 
![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<!-- Add more badges as needed -->

---

## Latest Activity

This section displays dynamic GitHub stats for commits and pull requests for today, this month, and this year. The data is updated daily via GitHub Actions.

<!-- Begin GitHub Stats -->
<!-- The content below is automatically updated by the GitHub Action -->
<!-- Do not modify this section manually -->

<!-- The stats.md file content will be inserted here automatically during the workflow run -->

<!-- End GitHub Stats -->

---

## Setup for Dynamic Stats

To automatically update these stats, this repository includes a GitHub Action and a Node.js script.

### 1. GitHub Action Workflow

Create a file at `.github/workflows/update-stats.yml` with the following content:

```yaml
name: Update Stats

on:
  schedule:
    - cron: '0 0 * * *'  # Runs daily at midnight UTC
  workflow_dispatch:

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install @octokit/rest

      - name: Run stats script
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node update-stats.js

      - name: Commit updated stats
        run: |
          git config --local user.name "GitHub Actions"
          git config --local user.email "actions@github.com"
          git add stats.md
          git commit -m "Update stats [skip ci]" || echo "No changes to commit"
          git push
