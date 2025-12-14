import { parseRepoUrl } from "../utils/helpers.js";
import { fetchRepo } from "../services/github.service.js";
import { analyzeRepoData } from "../services/analyzer.service.js";
import { scoreRepo } from "../services/scoring.service.js";
import { generateAISummaryAndRoadmap } from "../services/ai.service.js";

export async function analyzeRepo(req, res) {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL is required" });
    }

    let owner, repo;
        try {
        ({ owner, repo } = parseRepoUrl(repoUrl));
        } catch (err) {
        return res.status(400).json({
            error: "Please provide a valid public GitHub repository URL"
        });
        }


            let githubData;
        try {
        githubData = await fetchRepo(owner, repo);
        } catch (err) {
        return res.status(404).json({
            error: "Repository not found or is private"
        });
}


    const metrics = analyzeRepoData(githubData);

    const scored = scoreRepo(metrics);

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

    let aiOutput;
    try {
      aiOutput = await generateAISummaryAndRoadmap(aiInput);
    } catch (aiError) {
      console.error("⚠️ AI failed, using fallback:", aiError.message);

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

    //ye final responsee to frontend
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
    console.error(" Repository analysis failed:", error);
    return res.status(500).json({
      error: "Failed to analyze repository"
    });
  }
}
