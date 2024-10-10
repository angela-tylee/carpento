import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="py-3 px-6 bg-secondary">
      <nav className="navbar navbar-expand-lg p-0 fw-normal">
        <div className="p-0">
          <Link to="/" className="navbar-brand"><img src="../images/logo.png" alt="logo" width="154" /></Link>
          <p>| Dashboard</p>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
