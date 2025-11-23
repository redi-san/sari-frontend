import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    const user = JSON.parse(localStorage.getItem("sariUser"));

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!user || user.email !== email) {
      alert("No account found with that email.");
      return;
    }

    // Simulate sending reset link
    localStorage.setItem("resetRequested", "true");

    setMessage(
      "Reset instructions have been sent to your email. (Demo: Open newpass.html)"
    );
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        // background: "linear-gradient(135deg, #fffbea, #fff9d9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "22px", color: "#444", marginBottom: "15px" }}>
          Forgot Password
        </h1>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
          Enter your registered email and we’ll send you instructions to reset
          your password.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        />
        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ffcc00",
            color: "#333",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => (e.target.style.background = "#ffdb4d")}
          onMouseOut={(e) => (e.target.style.background = "#ffcc00")}
        >
          Send
        </button>
        {message && (
          <p style={{ color: "green", fontSize: "14px", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
export default ForgotPassword