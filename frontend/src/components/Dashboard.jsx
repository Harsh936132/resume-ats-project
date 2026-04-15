import Chatbot from "./Chatbot";

function Dashboard() {

  const upload = async () => {
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("jobDescription", document.getElementById("jd").value);
    formData.append("file", document.getElementById("file").files[0]);

    await fetch("http://localhost:8080/api/candidates/upload", {
      method: "POST",
      body: formData
    });

    alert("Candidate Added!");
  };

  return (
    <div>

      <h2 style={{
        background: "linear-gradient(90deg,#7c3aed,#22d3ee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        ATS Resume Screener
      </h2>

      <div className="layout">

        <div className="card">
          <h3>Add Candidate</h3>

          <input id="name" placeholder="Name" />
          <input id="email" placeholder="Email" />
          <input id="phone" placeholder="Phone" />
          <textarea id="jd" placeholder="Job Description"></textarea>
          <input type="file" id="file" />

          <button onClick={upload}>Upload & Analyze</button>

          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            Upload PDF resumes only (Max 5MB)
          </p>
        </div>

        <div className="card">
          <h3>AI Assistant</h3>
          <Chatbot />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;