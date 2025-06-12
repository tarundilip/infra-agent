import { useEffect, useState } from 'react';
import './index.css';
import ChartView from './components/ChartView';

function App() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetch("http://35.202.181.214:8000/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const f = reports.filter(r =>
      r.filename.toLowerCase().includes(lower)
    );
    setFiltered(f);
    setPage(0);
  }, [search, reports]);

  const pages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="container">
      <h1>Infra Agent Reports</h1>
      <input
        type="text"
        placeholder="Search by filename..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="searchBox"
      />

      {loading ? <p>Loading...</p> : (
        <>
          {pageData.map((r, i) => (
            <div className="report" key={i}>
              <p><strong>Filename:</strong> {r.filename}</p>
              <p><strong>CPU %:</strong> {r.cpu_percent}</p>
              <p><strong>Memory %:</strong> {r.memory_percent}</p>
              <p><strong>Disk %:</strong> {r.disk_percent}</p>
              <p><strong>Ping to Google (ms):</strong> {r.ping_google_ms}</p>
              <hr />
            </div>
          ))}
          <ChartView key={JSON.stringify(filtered)} reports={filtered} />
          <div className="pagination">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
            <span> Page {page + 1} of {pages} </span>
            <button disabled={page + 1 >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;