function CandidateDetails({ selected }) {
  if (!selected) return <div className="card">Select Candidate</div>;

  const Bar = ({ label, value }) => (
    <div className="bar-block">
      <span>{label}</span>
      <div className="bar">
        <div className="fill" style={{ width: value + "%" }}></div>
      </div>
    </div>
  );

  return (
    <div className="card">

     <h3 style={{ color: "#58a6ff" }}>
       Resume Analysis - {selected.name}
     </h3>

      <div className="candidate-header">
        <div>
          <h2>{selected.name}</h2>
          <p>{selected.email}</p>
        </div>
        <div className="score-box">{selected.score}/100</div>
      </div>

      {/* BARS */}
      <Bar label="Impact" value={selected.experienceScore} />
      <Bar label="Brevity" value={selected.communicationScore} />
      <Bar label="Style" value={selected.projectScore} />
      <Bar label="Skills" value={selected.skillScore} />

      {/* INFO */}
      <div className="info-grid">
        <div className="info-card">🎓 {selected.qualification}</div>
        <div className="info-card">📊 {selected.marks}</div>
        <div className="info-card">💼 {selected.experience}</div>
        <div className="info-card">
          💡 {selected.skills?.join(", ")}
        </div>
      </div>

      {/* RESUME */}
      <h3>Resume</h3>
      <div className="resume-clean">
        {selected.resumeText?.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

    </div>
  );
}

export default CandidateDetails;