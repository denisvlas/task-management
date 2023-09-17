import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/projects">Home</Link>
    </div>
  );
};

export default NotFound;
