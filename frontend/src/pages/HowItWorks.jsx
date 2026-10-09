export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">How It Works</h1>
        <p className="text-center text-lg text-base-content/70 mb-12">
          Learn how JusticeBuddy helps you navigate the Indian legal system
        </p>

        <div className="space-y-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🤖</div>
                <div>
                  <h2 className="card-title text-2xl mb-3">Legal Chatbot</h2>
                  <p className="text-base-content/80 mb-4">
                    Our AI-powered chatbot answers legal questions using information from the 
                    <strong> Department of Justice (DoJ)</strong>. Ask questions in your preferred language:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base-content/70">
                    <li><strong>English</strong> - For pan-India queries</li>
                    <li><strong>தமிழ் (Tamil)</strong> - Tamil Nadu specific guidance</li>
                    <li><strong>हिंदी (Hindi)</strong> - North India legal queries</li>
                    <li><strong>తెలుగు (Telugu)</strong> - Andhra Pradesh & Telangana support</li>
                    <li><strong>ಕನ್ನಡ (Kannada)</strong> - Karnataka legal assistance</li>
                  </ul>
                  <div className="alert alert-info mt-4">
                    
                    <span>The chatbot can help with RTI, FIR, bail, divorce, property, consumer rights, and more.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="text-5xl">⚖️</div>
                <div>
                  <h2 className="card-title text-2xl mb-3">Real-Time Case Tracking</h2>
                  <p className="text-base-content/80 mb-4">
                    Track your court case status in real-time using your <strong>CNR Number</strong> 
                    (Case Number Record) from the eCourts system.
                  </p>
                  
                  <div className="steps steps-vertical lg:steps-horizontal w-full my-6">
                    <div className="step step-primary">Enter CNR</div>
                    <div className="step step-primary">Auto-Monitor</div>
                    <div className="step step-primary">Get Alerts</div>
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-base-content/70">
                    <li>Enter your 16-digit CNR number from court documents</li>
                    <li>Our system checks eCourts API every <strong>30 minutes</strong></li>
                    <li>Real-time updates on case status, next hearing dates, and judgments</li>
                    <li>Works for all district courts and high courts in India</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="text-5xl">📱</div>
                <div>
                  <h2 className="card-title text-2xl mb-3">WhatsApp Notifications</h2>
                  <p className="text-base-content/80 mb-4">
                    Never miss an important update! Get instant <strong>WhatsApp alerts</strong> when 
                    your case status changes.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base-content/70">
                    <li>Instant notifications when case status changes</li>
                    <li>Alerts for new hearing dates and judgments</li>
                    <li>Secure and private - only you receive your case updates</li>
                    <li>No need to repeatedly check eCourts website</li>
                  </ul>
                  <div className="alert alert-success mt-4">
                    
                    <span>Messages are sent via Twilio's secure WhatsApp Business API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-3">Why JusticeBuddy?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">✅ For Citizens</h3>
                  <ul className="space-y-1 text-sm opacity-90">
                    <li>• Easy access to legal information</li>
                    <li>• No technical knowledge needed</li>
                    <li>• Support in regional languages</li>
                    <li>• Free to use</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">⚡ Key Features</h3>
                  <ul className="space-y-1 text-sm opacity-90">
                    <li>• 24/7 chatbot availability</li>
                    <li>• Automated case monitoring</li>
                    <li>• Real-time WhatsApp alerts</li>
                    <li>• Admin dashboard for tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/track-case" className="btn btn-primary btn-lg mr-4">
              Start Tracking Case
            </a>
            <a href="/chatbot" className="btn btn-outline btn-lg">
              Ask Legal Question
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
