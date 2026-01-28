import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setJobs(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const addJob = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ companyName, role, status })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Error adding job");

    setCompanyName("");
    setRole("");
    setStatus("Applied");
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchJobs();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar">
        <h2>Job Tracker</h2>
        <button className="btn" onClick={logout}>Logout</button>
      </div>

      <div className="container">
        <h3>Add Job</h3>
        <form className="form" onSubmit={addJob}>
          <input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <button className="btn">Add Job</button>
        </form>

        <h3>My Jobs</h3>
        <div className="jobs">
          {jobs.length === 0 ? (
            <p>No jobs yet.</p>
          ) : (
            jobs.map((job) => (
              <div className="jobCard" key={job._id}>
                <h4>{job.companyName}</h4>
                <p><b>Role:</b> {job.role}</p>
                <p><b>Status:</b> {job.status}</p>
                <button className="btn danger" onClick={() => deleteJob(job._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
