import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CandidateList from "./components/CandidateList";
import CandidateDetails from "./components/CandidateDetails";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>⚡ ATS</h2>

        <button onClick={() => setPage("home")}>🏠 Home</button>
        <button onClick={() => setPage("candidates")}>👤 Candidates</button>
      </div>

      {/* MAIN */}
      <div className="main">

        {page === "home" && <Dashboard />}

        {page === "candidates" && (
          <div className="layout">
            <CandidateList setSelected={setSelected} />
            <CandidateDetails selected={selected} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;