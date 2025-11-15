import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3>User Information</h3>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: user.role === "admin" ? "#007bff" : "#6c757d",
              color: "white",
              borderRadius: "4px",
              fontSize: "0.9em",
            }}
          >
            {user.role}
          </span>
        </p>
        <p>
          <strong>Email Verified:</strong>{" "}
          {user.email_verified ? "✅ Yes" : "❌ No"}
        </p>
        <p>
          <strong>Account Status:</strong>{" "}
          {user.is_active ? "✅ Active" : "❌ Inactive"}
        </p>
      </div>

      {user.role === "admin" && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "1px solid #ffc107",
          }}
        >
          <h3>Admin Panel</h3>
          <p>
            You have admin privileges. You can manage users and their roles.
          </p>
          {/* Add admin features here later */}
        </div>
      )}
    </div>
  );
};
