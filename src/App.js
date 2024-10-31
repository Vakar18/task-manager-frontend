import React from 'react';
import { Container, Typography } from '@mui/material';
import HomePage from '../src/components/pages/HomePage';
import AppBar from '@mui/material/AppBar';

const App = () => {
  return (
    <Container maxWidth="md">
       <AppBar component="nav">
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>
      </AppBar>
      <HomePage />
    </Container>
  );
};

export default App;
