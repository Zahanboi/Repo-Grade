import { useState } from "react";
import RepoInput from "../components/RepoInput";
import ScoreCard from "../components/ScoreCard";
import SummaryCard from "../components/SummaryCard";
import Roadmap from "../components/Roadmap";
import Loader from "../components/Loader";

export default function Analyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>GitGrade</h1>
      <p style={{ marginBottom: "2rem", color: "#9ca3af" }}>
        Turn any GitHub repository into a developer report card
      </p>

      <RepoInput setResult={setResult} setLoading={setLoading} />

      {loading && <Loader />}

      {result && (
        <>
          <ScoreCard score={result.score} />
          <SummaryCard summary={result.summary} />
          <Roadmap roadmap={result.roadmap} />
        </>
      )}
    </>
  );
}
