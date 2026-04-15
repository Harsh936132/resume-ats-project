function CandidateDetails({ selected }) {
  if (!selected) return <div className="card">Select Candidate</div>;

  const Bar = ({ label, value }) => (
    <div>
      <p>{label}</p>
      <div className="bar">
        <div className="fill" style={{ width: value + "%" }}></div>
      </div>
    </div>
  );

  return (
    <div className="card">

      <h2>{selected.name}</h2>
      <div className="score-box">{selected.score}/100</div>

      <Bar label="Impact" value={selected.experienceScore} />
      <Bar label="Brevity" value={selected.communicationScore} />
      <Bar label="Style" value={selected.projectScore} />
      <Bar label="Skills" value={selected.skillScore} />

      <div className="info-grid">
        <div className="info-card">🎓 {selected.qualification}</div>
        <div className="info-card">📊 {selected.marks}</div>
        <div className="info-card">💼 {selected.experience}</div>
        <div className="info-card">💡 {selected.skills?.join(", ")}</div>
      </div>

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