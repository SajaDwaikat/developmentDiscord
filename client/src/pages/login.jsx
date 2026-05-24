import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";
import toast from "react-hot-toast";
import { HiAcademicCap } from "react-icons/hi";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  try {
    const res = await api.post(
      "/auth/login",
      formData
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success(
      "Login successful"
    );

    navigate("/chat");
  } catch (error) {
    console.log(error);

    toast.error(
      "Invalid credentials"
    );
  }
};

  return (<div className="auth-container">
  <div className="auth-wrapper">

    <div className="auth-logo">
      <div className="logo-box">
        <HiAcademicCap />
        </div>

      <h1>UniCord</h1>

   

      <p>
        Welcome back
      </p>
    </div>

    <form
      className="auth-card"
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>

      <p className="auth-subtitle">
        Sign in to continue chatting.
      </p>

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
        Login
      </button>

      <div className="auth-footer">
        Don't have an account?
        <Link to="/">
          {" "}Register
        </Link>
      </div>
    </form>

  </div>
</div>
  );
}

export default Login;