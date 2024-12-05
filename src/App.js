import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [uname, setUname] = useState("");
  const [repos, setRepos] = useState([]); // Initialize repos as an empty array
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchRepo = async () => {
    setLoading(true);
    setError(false); // Reset error state before new request

    try {
      const res = await fetch(
        "https://api.github.com/users/" + uname + "/repos"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const repo = await res.json();
      setRepos(repo); // Set fetched repos
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          type="text"
          placeholder="Enter GitHub username"
          onChange={(e) => setUname(e.target.value)}
        />
        <button onClick={fetchRepo}>Fetch</button>

        {isLoading && <div>Fetching...</div>}
        {error && <div>Error in fetching...</div>}

        {repos.length > 0 ? (
          <ul>
            {repos.map((rep) => (
              <li key={rep.id}>{rep.name}</li>
            ))}
          </ul>
        ) : (
          !isLoading && !error && <div>No repositories found</div>
        )}
      </header>
    </div>
  );
}

export default App;
