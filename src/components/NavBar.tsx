import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

function NavBar() {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const user = jwtDecode<User>(token);
    setUser(user);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand m-3" to="/articles">
        Library Management
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/articles">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          )}
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="register">
                  Register
                </NavLink>
              </li>
            </>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
