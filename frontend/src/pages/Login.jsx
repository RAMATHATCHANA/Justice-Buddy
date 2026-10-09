import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Validate credentials (demo credentials: demo/demo123)
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    // Check if credentials match demo account
    if (username === "demo" && password === "demo123") {
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);

      // Redirect to home
      navigate("/");
    } else {
      setError("Invalid username or password. Try demo/demo123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div
        style={{ width: "300px", height: "20px" }}
        className="flex items-center justify-center mb-6"
      >
        <img
          src="/assets/logo.jpeg"
          alt="JusticeBuddy Logo"
          style={{ width: "35px", height: "35px" }}
          className="rounded-full object-cover mr-3"
        />
        <h2 className="card-title text-2xl font-bold">JusticeBuddy</h2>
      </div>
      <div
        style={{
          width: "660px",
          height: "315px",
          backgroundColor: "orangered",
        }}
        className="card w-96 bg-base-100 shadow-xl"
      >
        <div
          style={{
            padding: "80px",
            paddingLeft: "130px",
            paddingTop: "1px",
          }}
          className="card-body"
        >
          <h3 className="text-xl text-center mb-4">LOGIN</h3>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <br></br>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                style={{
                  width: "400px",
                  height: "25px",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <br></br>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                style={{
                  width: "400px",
                  height: "25px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              style={{
                width: "400px",
                height: "25px",
              }}
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-base-content/70">
            <p>OR</p>
            <p>Demo credentials for testing:</p>
            <p className="font-mono">Username: demo / Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
