import React from 'react';
import {
    Link, useNavigate,
  } from "react-router-dom";
import axios from 'axios';


const Header = () => {
  var navigate = useNavigate();



  const submitLogout = (e) => {
    e.preventDefault();
        axios.post('/api/logout')
          .then(res =>{
              if(res.data.status === 2050) {
                  /* localStorage.removeItem('auth_token', res.data.token);
                  localStorage.removeItem('username'); */
                  localStorage.clear()
                  navigate('/')
                  console.log(res.data.success)
              }
          })
    }
    var authButtons = '';
    if(!localStorage.getItem('auth_token')){
      authButtons = ( 
            <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
            );
    }else {
      authButtons = (
        <li className="nav-item">
        <button className="nav-link btn btn-warning" type="button" onClick={submitLogout}>Logout</button>
      </li>
      );
    }

    return (
        <div>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">Navbar</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                  </li>
                  {authButtons}
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
};

export default Header;