import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("bluepastel");
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bluepastel";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const themes = ["bluepastel", "light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-base-200 shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side (logo) */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.jpeg"
            alt="JusticeBuddy Logo"
            style={{ width: "35px", height: "35px" }}
            className="rounded-full object-cover"
          />
          <span
            style={{ width: "35px", height: "35px" }}
            className="text-xl font-bold text-primary"
          >
            JusticeBuddy
          </span>
        </div>

        {/* Right side (links + theme toggle) */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-base font-medium hover:text-primary">
            Home
          </Link>
          <div>. </div>
          <Link
            to="/track-case"
            className="text-base font-medium hover:text-primary"
          >
            Track Case
          </Link>
          <div>. </div>
          <Link
            to="/chatbot"
            className="text-base font-medium hover:text-primary"
          >
            Chatbot
          </Link>
          <div>. </div>
          <Link
            to="/how-it-works"
            className="text-base font-medium hover:text-primary"
          >
            How it Works
          </Link>
          <div> .</div>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            title={`Current theme: ${theme}`}
          >
            <span className="text-2xl">☽</span>
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-lg font-bold">
                  {username[0].toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
