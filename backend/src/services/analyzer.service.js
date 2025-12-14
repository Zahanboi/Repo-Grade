export function analyzeRepoData({ repo, commits, contents, languages }) {
  return {
    fileCount: contents.length,
    commitCount: commits.length,
    hasReadme: contents.some(f => f.name.toLowerCase().includes("readme")),
    languages: Object.keys(languages),
    hasTests: contents.some(f =>
      f.name.toLowerCase().includes("test")
    )
  };
}
