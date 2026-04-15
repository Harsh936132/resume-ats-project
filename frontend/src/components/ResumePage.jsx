function ResumePage({ selected, goBack }) {
  if (!selected) return null;

  const getColor = (score) => {
    if (score >= 75) return "green";
    if (score >= 50) return "orange";
    return "red";
  };

  return (
    <div className="resume-page">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={goBack}>⬅ Back</button>

      <h2>{selected.name}</h2>

      <h1 style={{ color: getColor(selected.score) }}>
        {selected.score}/100
      </h1>

      <p><b>Email:</b> {selected.email}</p>
      <p><b>Phone:</b> {selected.phone}</p>

      <h3>💡 Skills</h3>
      <p>{selected.skills?.join(", ")}</p>

      <h3>📊 Details</h3>
      <p>🎓 {selected.qualification}</p>
      <p>📈 {selected.marks}</p>
      <p>💼 {selected.experience}</p>

      <h3>📄 Resume</h3>
      <div className="resume-box-full">
        {selected.resumeText}
      </div>

    </div>
  );
}

export default ResumePage;