
import React, { useState, useContext } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

function Login() {
  // Firebase config from .env
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  // Initialize Firebase only once
  if (!window._firebaseInitialized) {
    initializeApp(firebaseConfig);
    window._firebaseInitialized = true;
  }
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Bootstrap validation check
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/api/auth/login", formData);
      login(res.data.token);
      localStorage.setItem("username", res.data.user.username);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(
        err.response?.data?.error || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow">
        <h2 className="text-center fs-4 fs-md-3 mb-4">
          🌐 Welcome to{" "}
          <span className="gradient-text">Fediverse</span>
        </h2>

        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleLogin}
        >
          {/* Username */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="floatingUsername"
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <label htmlFor="floatingUsername">Username</label>
            <div className="invalid-feedback">Please enter your username.</div>
          </div>

          {/* Password */}
          <div className="form-floating mb-4">
            <input
              type="password"
              id="floatingPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
            <div className="invalid-feedback">
              Please enter your password.
            </div>
          </div>

          <button
            className="btn btn-login-main w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          className="btn btn-outline-primary w-100 mt-3"
          onClick={async () => {
            try {
              const result = await signInWithPopup(auth, googleProvider);
              const user = result.user;
              const firebaseIdToken = await user.getIdToken();
              // Send token to backend
              const res = await API.post("/api/auth/google", { token: firebaseIdToken });
              login(res.data.token);
              localStorage.setItem("username", res.data.user.username);
              alert("Google login successful");
              navigate("/");
            } catch (err) {
              console.error("Google login failed:", err);
              alert("Google login failed");
            }
          }}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" style={{ width: 20, marginRight: 8, verticalAlign: 'middle' }} />
          Sign in with Google
        </button>
      </div>
    </div>
  );

}

export default Login;
