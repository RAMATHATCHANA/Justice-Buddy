import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeProvider from './components/ThemeProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import TrackCase from './pages/TrackCase';
import Chatbot from './pages/Chatbot';
import HowItWorks from './pages/HowItWorks';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-base-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/track-case" element={<TrackCase />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/admin" element={<AdminPanel />} />
                  </Routes>
                </main>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
