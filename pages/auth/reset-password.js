import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig'; // Adjust the path if necessary

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Clear previous messages
    setEmailError(''); // Clear previous errors

    // Basic email format validation
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
      setEmail(''); // Clear the email field
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage(`Error: ${error.message}`); // Display error message
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(''); // Clear email error when typing
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
          Reset Password
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
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          {message && (
            <Typography variant="body2" color={message.startsWith('Error') ? 'error' : 'success'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;