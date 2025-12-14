export default function SummaryCard({ summary }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: "0.8rem" }}>Evaluation Summary</h3>
      <p style={{ color: "#d1d5db", lineHeight: "1.6" }}>{summary}</p>
    </div>
  );
}
