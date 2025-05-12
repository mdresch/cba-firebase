"use client";
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming AuthContext is in the correct relative path
import { Button, TextField, Typography, Container, Box } from '@mui/material'; // Import Material UI components// Import Material UI components
import { useRouter } from 'next/navigation'; // Using next/navigation for App Router

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { signInWithGoogle } = useAuth(); // Using signInWithGoogle from AuthContextModule.useAuth()
  const router = useRouter(); // Using next/navigation for App Router

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Assuming a login function exists in AuthContext that takes email and password
      // await login(email, password);
      // Replace with appropriate login logic if not using email/password
      console.log('Login with email:', email, 'password:', password);
      // Redirect or perform action on successful login
      router.push('/admin'); // Redirect to admin page on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/admin'); // Redirect on successful Google login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" component="h2" textAlign="center" mb={3}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
 <Button
 type="submit"
 fullWidth
 variant="contained"
 sx={{ mt: 3, mb: 2 }}
 disabled={loading}
 >
            Login
 </Button>
          <Button fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }} disabled={loading}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
        </Box>
      </Box>
    </div>
  )
};
export default Login;