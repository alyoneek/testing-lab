import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <Link to="/main" className="btn btn-primary" id="go-button">
        Go to form
      </Link>
    </div>
  );
};

export default Home;
