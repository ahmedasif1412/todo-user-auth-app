import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

function Auth({ onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLoginView) {
        const { email, password } = formData;
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.name);
      } else {
        await registerUser(formData);
        alert("Registration successful! Please login.");
        setIsLoginView(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLoginView ? "Login" : "Sign Up"}</h2>
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLoginView && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-submit-btn">
          {isLoginView ? "Login" : "Register"}
        </button>
      </form>

      <p className="auth-toggle-text">
        {isLoginView ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLoginView(!isLoginView);
            setError("");
          }}
          className="auth-toggle-btn"
        >
          {isLoginView ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
