import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated,signout} from "../auth/helper/index"



const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div className=" sticky-top" style={{backgroundColor:"black"}}>
    <ul className="nav  nav-pills justify-content-center">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
        <span><i class=" fa fa-home fa-fw"></i></span>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          <span><i class="fa fa-shopping-cart fa-fw"></i></span>
          Cart
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role===0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role===1 && (
        <li className="nav-item ">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
          <Fragment>
          <li className="nav-item ">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (  //conditional rendering of Signout
        <li className="nav-item ">
          <span
           className="nav-link text-white"
           onClick={()=>{
             signout(()=>{
               history.push("/signin")
             })
           }}
          >
          Signout
          </span>
        </li>
      )} 
    </ul>
  </div>

);

export default withRouter(Menu);
