import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Advanced Battery Management Systems
      </Typography>
      <Link href="/admin" passHref>
        <Button variant="contained" color="primary" size="large">
          Go to Admin Dashboard
        </Button>
      </Link>
    </Box>
  );
};

export default LandingPage;