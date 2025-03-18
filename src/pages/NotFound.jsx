import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1" style={{ fontSize: '10rem' }}>404</h1>
      <p className="fs-3">Page not found</p>
      <NavLink to="/"><button className="btn btn-outline-dark mt-5">Back to Home</button></NavLink>
    </div>
  );
};

export default NotFound;