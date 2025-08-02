import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/profile" className="hover:underline">Profile</Link></li>
        <li><Link to="/submit" className="hover:underline">Submit Startup</Link></li>
        <li><Link to="/admin" className="hover:underline">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;