import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="navbar bg-primary text-primary-content flex justify-between">
        <div>
          <a className="btn btn-ghost normal-case text-xl">Auth Master</a>
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            Home
          </Link>
          <Link className="btn btn-ghost normal-case text-xl" to="/login">
            Login
          </Link>
          <Link className="btn btn-ghost normal-case text-xl" to="/register">
            Register
          </Link>
          {user && (
            <Link className="btn btn-ghost normal-case text-xl" to="/profile">
              Profile
            </Link>
          )}
          <Link className="btn btn-ghost normal-case text-xl" to="/orders">
            Orders
          </Link>
        </div>
        <div>
          {user ? (
            <>
              {user.email}
              <span>
                <button onClick={handleLogOut} className="btn btn-xs">
                  Log out
                </button>
              </span>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
