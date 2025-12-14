import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GITHUB_TOKEN) {
  throw new Error("❌ GITHUB_TOKEN is not defined");
}

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "GitGrade-App"
  }
});

export async function fetchRepo(owner, repo) {
  const repoData = await githubApi.get(`/repos/${owner}/${repo}`);
  const commits = await githubApi.get(`/repos/${owner}/${repo}/commits`);
  const contents = await githubApi.get(`/repos/${owner}/${repo}/contents`);
  const languages = await githubApi.get(`/repos/${owner}/${repo}/languages`);

  return {
    repo: repoData.data,
    commits: commits.data,
    contents: contents.data,
    languages: languages.data
  };
}
