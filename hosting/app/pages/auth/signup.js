import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { createUserWithEmailAndPassword, FirebaseError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebaseConfig';

const SignUpPage = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setFirebaseError('');

    // Client-side validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Assign a default role ('user') upon sign-up
      await setDoc(doc(db, "users", userId), {
        email,
        role: "user", // Default role assigned to new users
        createdAt: new Date(),
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            error={!!emailError}
            helperText={emailError}
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
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          {firebaseError && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {firebaseError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;