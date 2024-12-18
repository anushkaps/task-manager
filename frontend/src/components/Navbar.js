import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    padding: '10px 20px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: '18px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
    maxWidth: '500px',  // Mobile screen width
    margin: '0 auto',  // Center align
  }}>
    <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px' }}>Dashboard</Link>
    <div>
      <Link to="/progress" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Progress</Link>
    </div>
  </nav>
);

export default Navbar;
