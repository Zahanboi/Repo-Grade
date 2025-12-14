export default function ScoreCard({ score }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "3rem", color: "#f59e0b" }}>
        {score.numeric}
      </h2>
      <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
        {score.level} · {score.badge}
      </p>
    </div>
  );
}
