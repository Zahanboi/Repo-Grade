function Section({ title, items }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <h4 style={{ marginBottom: "0.5rem", color: "#f59e0b" }}>
        {title}
      </h4>
      <ul style={{ paddingLeft: "1.2rem" }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.4rem" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Roadmap({ roadmap }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: "1rem" }}>Personalized Roadmap</h3>
      <Section title="Immediate Fixes" items={roadmap.immediate_fixes} />
      <Section title="Skill Improvements" items={roadmap.skill_improvements} />
      <Section
        title="Professional Practices"
        items={roadmap.professional_practices}
      />
    </div>
  );
}
