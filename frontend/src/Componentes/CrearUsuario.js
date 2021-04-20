import React, { Component } from 'react'
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class CrearUsuario extends Component {
    render() {
        return (
            <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Quiniela APP</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
            <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Username" />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control form-control-sm"  placeholder="Enter password" />
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="First name" />
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Last name" />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Tier" />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Fecha Nacimiento" />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Fecha Registro" />
                </div>

                <div className="mb-3" >
                    <input type="email" className="form-control form-control-sm" placeholder="Enter email" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            </div>
        );
    }
}
