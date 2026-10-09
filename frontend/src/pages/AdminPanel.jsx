import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function AdminPanel() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/cases`);
      setCases(response.data.cases);
    } catch (err) {
      setError('Failed to fetch cases. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen pt-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-base-content/70 mt-2">Monitor all tracked cases and their status</p>
          </div>
          <button
            onClick={fetchCases}
            className="btn btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-base-content/70">Loading cases...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-2">No Cases Tracked Yet</h3>
            <p className="text-base-content/70 mb-6">
              Add a case using the Track Case page to begin monitoring status updates.
            </p>
            <a href="/track-case" className="btn btn-primary">
              Track Your First Case
            </a>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="stats shadow bg-base-200">
                <div className="stat">
                  <div className="stat-title">Total Cases</div>
                  <div className="stat-value text-primary">{cases.length}</div>
                </div>
              </div>

              <div className="stats shadow bg-base-200">
                <div className="stat">
                  <div className="stat-title">Notifications Sent</div>
                  <div className="stat-value text-success">
                    {cases.filter(c => c.notification_sent).length}
                  </div>
                </div>
              </div>

              <div className="stats shadow bg-base-200">
                <div className="stat">
                  <div className="stat-title">Active Monitoring</div>
                  <div className="stat-value text-secondary">{cases.length}</div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Tracked Cases</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>CNR Number</th>
                        <th>Court Details</th>
                        <th>Status</th>
                        <th>Phone</th>
                        <th>Last Checked</th>
                        <th>Notification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((caseItem) => (
                        <tr key={caseItem.id} className="hover">
                          <td>
                            <div className="font-bold">{caseItem.cnr_number}</div>
                            <div className="text-sm opacity-50">Year: {caseItem.filing_year}</div>
                          </td>
                          <td>
                            <div className="font-medium">{caseItem.court_name}</div>
                            <div className="text-sm opacity-50">{caseItem.district}, {caseItem.state}</div>
                          </td>
                          <td>
                            <div className="badge badge-primary badge-outline">
                              {caseItem.current_status}
                            </div>
                          </td>
                          <td className="text-sm">{caseItem.phone_number}</td>
                          <td className="text-sm">{formatDate(caseItem.last_checked)}</td>
                          <td>
                            {caseItem.notification_sent ? (
                              <div className="badge badge-success">Sent</div>
                            ) : (
                              <div className="badge badge-ghost">Pending</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-8">
              <div>
                <p className="font-semibold">Automatic Monitoring Active</p>
                <p className="text-sm">All cases are checked every 30 minutes. WhatsApp notifications are sent automatically when status changes.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
