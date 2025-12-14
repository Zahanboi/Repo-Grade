export function scoreRepo(metrics) {
  let score = 0;

  if (metrics.hasReadme) score += 15;
  if (metrics.hasTests) score += 20;
  if (metrics.commitCount > 10) score += 20;
  if (metrics.fileCount > 10) score += 15;
  if (metrics.languages.length > 1) score += 10;

  const level =
    score > 70 ? "Advanced" :
    score > 40 ? "Intermediate" :
    "Beginner";

  const badge =
    score > 70 ? "Gold" :
    score > 40 ? "Silver" :
    "Bronze";

  return { score, level, badge };
}
