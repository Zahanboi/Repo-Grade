export default function ScoreCard({ score }) {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        border: "1px solid #1f2937"
      }}
    >
      <p style={{ color: "#9ca3af" }}>Overall Score</p>

      <h2
        style={{
          fontSize: "3.5rem",
          color: "#f59e0b",
          margin: "0.5rem 0"
        }}
      >
        {score.numeric}
      </h2>

      <p style={{ fontSize: "1.1rem" }}>
        {score.level} · {score.badge}
      </p>
    </div>
  );
}
