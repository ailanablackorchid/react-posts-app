import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";
import classes from "./MyNavbar.module.css";

const MyNavbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className={classes.navbar}>
      <MyButton onClick={logout}>Log out</MyButton>
      <div className={classes.navbarLinks}>
        <Link className={classes.navbarLink} to="/about">
          About
        </Link>
        <Link className={classes.navbarLink} to="/posts">
          Posts
        </Link>
      </div>
    </div>
  );
};

export default MyNavbar;
