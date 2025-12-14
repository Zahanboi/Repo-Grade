import { useState } from "react";
import { analyzeRepo } from "../services/api";

function isValidGitHubRepoUrl(url) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);

    return (
      parsed.hostname === "github.com" &&
      parts.length === 2
    );
  } catch {
    return false;
  }
}

export default function RepoInput({ setResult, setLoading, loading }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    if (!isValidGitHubRepoUrl(repoUrl)) {
      setError("Enter a valid public GitHub repository URL.");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeRepo(repoUrl);
      setResult(data);
    } catch (err) {
      setError("**Failed to analyze repository. Please try again with a Public GitHub repository URL.**");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <input
        type="text"
        placeholder="https://github.com/username/repository"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        disabled={loading}
      />

      {error && (
        <p style={{ color: "#f87171", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: "0.8rem" }}
      >
        {loading ? "Analyzing..." : "Analyze Repository"}
      </button>
    </div>
  );
}
