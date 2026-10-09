import { useState } from 'react';
import axios from 'axios';

const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('replit')) {
      return `https://${hostname.replace('-5000', '-8000')}`;
    }
  }
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

function CaseTracker() {
  const [formData, setFormData] = useState({
    cnr_number: '',
    state: '',
    district: '',
    court_name: '',
    filing_year: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/track_case`, formData);
      setResult(response.data);
      setFormData({
        cnr_number: '',
        state: '',
        district: '',
        court_name: '',
        filing_year: '',
        phone_number: ''
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to track case. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Case</h1>
        <p className="text-gray-600 mb-6">
          Enter your case details to receive automatic WhatsApp notifications when your case status changes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CNR Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cnr_number"
              value={formData.cnr_number}
              onChange={handleChange}
              placeholder="e.g., TNMA020012342015"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">16-digit Case Number Record from your court documents</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., Tamil Nadu"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g., Chennai"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Court Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="court_name"
              value={formData.court_name}
              onChange={handleChange}
              placeholder="e.g., District Court Chennai"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filing Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="filing_year"
                value={formData.filing_year}
                onChange={handleChange}
                placeholder="e.g., 2023"
                required
                pattern="\d{4}"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="e.g., +919876543210"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +91 for India)</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Tracking Case...
              </span>
            ) : (
              'Start Tracking'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Case Tracking Activated!</h3>
            
            {result.status === 'already_tracked' ? (
              <div className="text-green-800">
                <p className="mb-2">This case is already being monitored.</p>
                <div className="bg-white p-3 rounded mt-3">
                  <p><strong>CNR:</strong> {result.case.cnr}</p>
                  <p><strong>Current Status:</strong> {result.case.current_status}</p>
                  <p><strong>Last Checked:</strong> {new Date(result.case.last_checked).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-green-800">
                <p className="mb-3">Your case is now being monitored. You'll receive WhatsApp notifications when the status changes.</p>
                <div className="bg-white p-4 rounded">
                  <p className="mb-2"><strong>CNR:</strong> {result.case_data.cnr}</p>
                  <p className="mb-2"><strong>Current Status:</strong> {result.case_data.status}</p>
                  <p className="mb-2"><strong>Court:</strong> {result.case_data.court}</p>
                  {result.case_data.next_hearing && (
                    <p className="mb-2"><strong>Next Hearing:</strong> {result.case_data.next_hearing}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-3">
                    💡 Status checks happen every 30 minutes. WhatsApp notifications will be sent automatically.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 p-4 rounded-md">
          <h4 className="font-semibold text-blue-900 mb-2">ℹ️ How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your case status is checked automatically every 30 minutes</li>
            <li>• You'll receive WhatsApp alerts when the status changes</li>
            <li>• All tracked cases can be viewed in the Admin Panel</li>
            <li>• CNR number format: 16 characters (State+District+Year+Number)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CaseTracker;
