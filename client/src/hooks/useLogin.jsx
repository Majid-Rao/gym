import { useState } from 'react';
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useLogin = () => {
  const { login } = useAuth();  // Login function from the AuthContext
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);

        // Save the token in localStorage
        localStorage.setItem('token', data.token);  // Store the token in localStorage

        // Perform the login process with token and user data (you might need to adjust your login function)
        login(data.token, data.user);
      } else if (res.status === 404) {
        setError(data.message);
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      setError('Email or password is incorrect!');
      message.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
