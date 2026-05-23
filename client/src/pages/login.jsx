import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

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

    console.log("LOGIN SUCCESS");
    console.log(res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    navigate("/chat");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      error.message
    );
  } 
};

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/"> Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;