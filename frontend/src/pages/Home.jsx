import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <Link to="/regular" className="btn btn-primary">
        Go to form
      </Link>
    </div>
  );
};

export default Home;
