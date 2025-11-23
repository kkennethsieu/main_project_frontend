// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_USER_API;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [mfaToken, setMfaToken] = useState(null);
  const [loading, setLoading] = useState(true); // track initialization

  // --- Helper: persist to localStorage ---
  const saveAuth = (token, userData) => {
    setAccessToken(token);
    setUser(userData);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearAuth = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  // --- Create ---

  const createUser = async (username, password, phoneNumber) => {
    try {
      if (!username || !password || !phoneNumber) {
        throw new Error("Invalid inputs");
      }
      const res = await fetch(`${API_URL}/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, phoneNumber }),
      });
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      setUser(data.user);
      setMfaToken(data.user.mfaToken);
      console.log("Successfully created");
      return data.user.mfaToken;
    } catch (err) {
      console.error(err);
    }
  };
  // --- Login ---
  const login = async (username, password) => {
    if (!username || !password) {
      throw new Error("Invalid inputs");
    }
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      saveAuth(data.accessToken, data.user);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // --- Logout ---
  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      clearAuth();
      console.log("Logged out");
    }
  };
  // --- Verify MFA ---
  const verifyMFA = async (userCode, realToken) => {
    try {
      const res = await fetch(`${API_URL}/auth/MFA-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfaInput: userCode, mfaToken: realToken }),
        credentials: "include",
      });
      const data = await res.json();
      saveAuth(data.accessToken, data.user);

      if (!res.ok) {
        console.error("MFA FAiled:", data);
      }
      console.log("Verify success");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  // --- Refresh token ---
  const refreshToken = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Invalid refresh token");

      const data = await res.json();
      if (user) {
        saveAuth(data.accessToken, user); // keep same user
      }
      console.log("Access token refreshed");
    } catch (err) {
      console.error("Failed to refresh token:", err);
      clearAuth();
    }
  };

  // --- Initialize auth on app load ---
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");

        // Safely parse stored user
        let storedUser = null;
        const rawUser = localStorage.getItem("user");
        if (rawUser) {
          try {
            storedUser = JSON.parse(rawUser);
          } catch (err) {
            console.error("Failed to parse stored user:", err);
            storedUser = null;
            localStorage.removeItem("user"); // optional: cleanup corrupted data
          }
        }

        // If both token and user exist, set them and refresh
        if (storedToken && storedUser) {
          setAccessToken(storedToken);
          setUser(storedUser);

          // Refresh token to get a new access token
          await refreshToken();
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        clearAuth(); // reset auth if anything goes wrong
      } finally {
        setLoading(false); // done initializing
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        createUser,
        login,
        logout,
        refreshToken,
        loading,
        setLoading,
        mfaToken,
        verifyMFA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- Custom hook for easy usage ---
export const useAuth = () => useContext(AuthContext);
