import React, { useState } from "react";
import styles from "../css/login.module.css"; // ✅ import as module
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // ✅ Firebase auth
import logo from "../assets/sarimanagelogo.png";
import hidePasswordIcon from "../assets/hidePassword.png";
import showPasswordIcon from "../assets/showPassword.png";



function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // ✅ init Firebase auth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // ✅ Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  const forgotPassword = () => {
    navigate("/forgotpassword"); // you can also trigger Firebase reset email
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
           <img src={logo} alt="Sari Manage Logo" />
          <h2>Sari Manage</h2>
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to manage your sari-sari store</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
  src={showPassword ? hidePasswordIcon : showPasswordIcon}
  alt={showPassword ? "Hide password" : "Show password"}
  className={styles.togglePassword}
  onClick={() => setShowPassword(!showPassword)}
/>

            </div>
          </div>

          {error && (
            <p id="loginError" className={styles.errorMessage}>
              {error}
            </p>
          )}

          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>

        <p className={styles.switch}>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>

        <p className={styles.forgot}>
          <button type="button" onClick={forgotPassword} className={styles.linkBtn}>
            Forgot Password?
          </button>
        </p>
      </div>

      {/* ✅ Success Modal */}
      {success && (
        <div id="successModal" className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Welcome, {email}</h3>
            <p>Login successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogIn;
