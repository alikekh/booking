import React, { useContext } from "react";
import { useHistory , Link} from "react-router-dom";
import UserContext from "../../context/userContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/signup");
  const login = () => history.push("/login");
 
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  const u = userData.user;

  return (

    <li className="menu-item-has-children">
        {userData.user ? (
        <Link to="#">{u.name}</Link>
        ) : (
        <Link to="#">Account</Link> 
        )}
    <ul className="sub-menu">
      {userData.user ? (
          <>
        <li><Link to="/user-profile">Profile</Link></li>
        <li><Link to="/" onClick={logout}>Log out</Link></li>
        </>
      ) : (
        <>
        <li><Link onClick={register}>Sign up</Link></li>
        <li><Link onClick={login}>Log in</Link></li>
        </>
      )}
      </ul>
    </li>

  );
}