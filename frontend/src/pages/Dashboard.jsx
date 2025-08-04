import { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [query, setQuery] = useState('');

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    alert(`You queried: ${query}`);
    // Here you'd send the query to your backend
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>🎉 You're Logged In!</h1>
        <p className="subtext">A unique UUID has been sent to your email.</p>
        <p className="tagline">— DevGeeks Policy Portal</p>

        <form onSubmit={handleQuerySubmit} className="query-form">
          <label htmlFor="query">Search Your Uploaded Policies:</label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here..."
            rows="4"
          />
          <button type="submit">Submit Query</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
