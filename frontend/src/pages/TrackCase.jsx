import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function TrackCase() {
  const [formData, setFormData] = useState({
    cnr_number: "",
    petitioner_name: "",
    phone_number: "",
    hearing_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const submitData = {
      cnr_number: formData.cnr_number,
      state: "Tamil Nadu",
      district: "Chennai",
      court_name: "District Court",
      filing_year: "2023",
      phone_number: formData.phone_number,
    };

    try {
      const response = await axios.post(`${API_URL}/track_case`, submitData);
      setResult(response.data);
      setFormData({
        cnr_number: "",
        petitioner_name: "",
        phone_number: "",
        hearing_date: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to track case. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-10"
      style={{ paddingLeft: "64px", paddingRight: "40px" }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-3">Track Your Case</h1>
        <p className="text-base-content/70 mb-8">
          Enter your case details to receive automatic WhatsApp notifications
          when your case status changes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                CNR Number <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="cnr_number"
              value={formData.cnr_number}
              onChange={handleChange}
              placeholder="e.g., TNMA020012342023"
              required
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt">
                16-digit Case Number Record
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Petitioner Name</span>
            </label>
            <input
              type="text"
              name="petitioner_name"
              value={formData.petitioner_name}
              onChange={handleChange}
              placeholder="Your name (optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Mobile Number <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+919876543210"
              required
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt">
                Include country code (e.g., +91)
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Date of Hearing</span>
            </label>
            <input
              type="date"
              name="hearing_date"
              value={formData.hearing_date}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Tracking Case...
              </>
            ) : (
              "Start Tracking"
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-error mt-6 max-w-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="alert alert-success mt-6 max-w-lg">
            <div>
              <h3 className="font-bold">Case Tracking Activated!</h3>
              <div className="text-sm">
                {result.status === "already_tracked" ? (
                  <p>This case is already being monitored.</p>
                ) : (
                  <p>You'll receive WhatsApp alerts when status changes.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="alert alert-info mt-8 max-w-lg">
          <div className="text-sm">
            <p className="font-semibold">How it works:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Status checked every 30 minutes</li>
              <li>WhatsApp alerts on status changes</li>
              <li>View all cases in Admin Panel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
