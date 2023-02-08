import React,{useContext} from "react";
import AuthProvider from "../store/auth-provider";
import classes from "./Navigation.module.css";


const Navigation = () => {
  const ctx  = useContext(AuthProvider);
  return (
    
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      };
   
  

export default Navigation;
