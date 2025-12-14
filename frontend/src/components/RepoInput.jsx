import { useState } from "react";
import { analyzeRepo } from "../services/api";

export default function RepoInput({ setResult, setLoading }) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      alert("Enter a GitHub repo URL");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeRepo(repoUrl);
      setResult(data);
    } catch (err) {
      alert("Failed to analyze repository");
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
      />
      <button onClick={handleAnalyze}>Analyze Repository</button>
    </div>
  );
}
