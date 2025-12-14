export async function analyzeRepo(req, res) {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: "Repo URL required" });
  }

  // TEMP response (replace step by step)
  return res.json({
    score: {
      numeric: 74,
      level: "Intermediate",
      badge: "Silver"
    },
    summary:
      "The repository demonstrates a clean modular structure and consistent commit history. However, limited test coverage and minimal documentation affect long-term maintainability.",
    roadmap: {
      immediate_fixes: [
        "Add README.md with setup instructions",
        "Refactor long functions"
      ],
      skill_improvements: [
        "Write unit tests for core logic",
        "Introduce ESLint and Prettier"
      ],
      professional_practices: [
        "Use feature branches and pull requests",
        "Add GitHub Actions CI pipeline"
      ]
    }
  });
}
