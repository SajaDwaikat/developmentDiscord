import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";
import { HiAcademicCap } from "react-icons/hi";
import { FaShieldAlt } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Register button clicked");
  console.log(formData);

  try {
    const res = await api.post(
      "/auth/register",
      formData
    );

    console.log("SUCCESS", res.data);

    alert("Account created successfully");

    navigate("/login");
  } catch (error) {
    console.log("ERROR:", error);
    console.log("RESPONSE:", error.response);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );
  }
};

  return (
   <div className="auth-container">
  <div className="auth-wrapper">

    <div className="auth-logo">
      <div className="logo-box">
        <HiAcademicCap />
    </div>
    <h1>UniCord</h1>

      <p>
        Real-Time Messaging Platform
      </p>
    </div>

    <form
      className="auth-card"
      onSubmit={handleSubmit}
    >
      <h2>Create Account</h2>

      <p className="auth-subtitle">
        Join real-time conversations instantly.
      </p>

      <div className="form-group">
        <label>Username</label>

        <input
          type="text"
          name="username"
          placeholder="john_doe"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          name="email"
          placeholder="name@workspace.com"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>

        <input
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        Create Account
      </button>

      <div className="auth-footer">
        Already have an account?
        <Link to="/login">
          {" "}Login
        </Link>
      </div>
    </form>

 <div className="auth-features">

  <div className="feature-card">
    <FaShieldAlt className="feature-icon" />
    <span>Secure Auth</span>
  </div>

  <div className="feature-card">
    <BsChatDotsFill className="feature-icon" />
    <span>Real-Time Chat</span>
  </div>

</div>

  </div>
</div>
  );
}

export default Register;