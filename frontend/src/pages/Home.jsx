import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen pt-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to JusticeBuddy
        </h1>
        <p className="text-center text-lg mb-12 text-base-content/70">
          Your AI-powered legal assistant for India. Track court cases, get legal guidance in your language, and receive real-time WhatsApp notifications.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="mx-4 card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary">
            <div className="card-body items-center text-center">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="card-title text-2xl mb-3">Track Cases</h2>
              <p className="mb-6">
                Monitor your court cases using CNR number. Get automatic WhatsApp alerts when case status changes.
              </p>
              <div className="card-actions">
                <Link to="/track-case" className="btn btn-primary">
                  Start Tracking →
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-4 card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary">
            <div className="card-body items-center text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="card-title text-2xl mb-3">Legal Chatbot</h2>
              <p className="mb-6">
                Ask legal questions in Tamil, Hindi, Telugu, Kannada, or English. Get instant answers about RTI, FIR, bail, and more.
              </p>
              <div className="card-actions">
                <Link to="/chatbot" className="btn btn-primary">
                  Ask Questions →
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-4 card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary">
            <div className="card-body items-center text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="card-title text-2xl mb-3">Admin Dashboard</h2>
              <p className="mb-6">
                View all tracked cases, monitor status changes, and manage WhatsApp notifications in one place.
              </p>
              <div className="card-actions">
                <Link to="/admin" className="btn btn-primary">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          
          <br />
          <Link to="/how-it-works" className="btn btn-outline btn-lg">
            Learn How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}
