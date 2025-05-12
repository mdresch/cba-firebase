'use client';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

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