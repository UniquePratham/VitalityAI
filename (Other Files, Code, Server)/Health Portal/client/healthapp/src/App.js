import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import DoctorRegister from './components/DoctorRegister';
import PatientRegister from './components/PatientRegister';
import AmbulanceRegister from './components/AmbulanceRegister';
import Login from './components/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AmbulanceDashboard from './pages/AmbulanceDashboard';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ErrorBoundary>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Health Monitor
            </Typography>
            <Button color="inherit" href="/">Login</Button>
            <Button color="inherit" onClick={handleMenuOpen}>
              Register
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component="a" href="/register/doctor">
                Doctor
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="/register/patient">
                Patient
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="/register/ambulance">
                Ambulance
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register/doctor" element={<DoctorRegister />} />
            <Route path="/register/patient" element={<PatientRegister />} />
            <Route path="/register/ambulance" element={<AmbulanceRegister />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/ambulance" element={<AmbulanceDashboard />} />
          </Routes>
        </Container>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
