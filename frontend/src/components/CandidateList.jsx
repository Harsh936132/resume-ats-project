import { useEffect, useState } from "react";

function CandidateList({ setSelected }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/candidates")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="card">
      <h3>Candidates</h3>

      {data.map((c, i) => (
        <div key={i} className="candidate" onClick={() => setSelected(c)}>
          {c.name} ({c.score})
        </div>
      ))}
    </div>
  );
}

export default CandidateList;