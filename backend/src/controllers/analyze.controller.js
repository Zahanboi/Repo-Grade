import { parseRepoUrl } from "../utils/helpers.js";
import { fetchRepo } from "../services/github.service.js";
import { analyzeRepoData } from "../services/analyzer.service.js";
import { scoreRepo } from "../services/scoring.service.js";
import { generateAISummaryAndRoadmap } from "../services/ai.service.js";

export async function analyzeRepo(req, res) {
  try {
    // -----------------------------
    // 1. Validate input
    // -----------------------------
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL is required" });
    }

    // -----------------------------
    // 2. Parse GitHub URL
    // -----------------------------
    const { owner, repo } = parseRepoUrl(repoUrl);

    // -----------------------------
    // 3. Fetch GitHub data
    // -----------------------------
    const githubData = await fetchRepo(owner, repo);

    // -----------------------------
    // 4. Analyze repo → metrics
    // -----------------------------
    const metrics = analyzeRepoData(githubData);

    // -----------------------------
    // 5. Score repo (deterministic)
    // -----------------------------
    const scored = scoreRepo(metrics);

    // -----------------------------
    // 6. Prepare AI input (CURATED)
    // -----------------------------
    const aiInput = {
      score: scored.score,
      level: scored.level,
      fileCount: metrics.fileCount,
      commitCount: metrics.commitCount,
      languages: metrics.languages,
      hasReadme: metrics.hasReadme,
      hasTests: metrics.hasTests,
      hasCI: metrics.hasCI,
      commitDiscipline: metrics.commitDiscipline,
      projectSize: metrics.projectSize
    };

    // -----------------------------
    // 7. Generate AI feedback
    // -----------------------------
    let aiOutput;
    try {
      aiOutput = await generateAISummaryAndRoadmap(aiInput);
    } catch (aiError) {
      console.error("⚠️ AI failed, using fallback:", aiError.message);

      // Safe fallback (never fail demo)
      aiOutput = {
        summary:
          "The repository reflects early-stage development with basic project structure. Improving documentation, testing, and version control practices would significantly enhance maintainability and professionalism.",
        immediate_fixes: [
          "Add a README.md with setup and usage instructions"
        ],
        skill_improvements: [
          "Introduce basic unit tests for core logic"
        ],
        professional_practices: [
          "Adopt clearer commit messages and consistent commit frequency"
        ]
      };
    }

    // -----------------------------
    // 8. Final response (frontend contract)
    // -----------------------------
    return res.json({
      score: {
        numeric: scored.score,
        level: scored.level,
        badge: scored.badge
      },
      summary: aiOutput.summary,
      roadmap: {
        immediate_fixes: aiOutput.immediate_fixes,
        skill_improvements: aiOutput.skill_improvements,
        professional_practices: aiOutput.professional_practices
      }
    });
  } catch (error) {
    console.error("❌ Repository analysis failed:", error);
    return res.status(500).json({
      error: "Failed to analyze repository"
    });
  }
}
