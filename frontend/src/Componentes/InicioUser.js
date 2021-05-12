import React, { Component } from 'react'
import {  Link } from 'react-router-dom';

import "base-64";

export default class CrearUsuario extends Component {
    render(){
        return(
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>Quiniela APP</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/perfil"}>Perfil de Usuario</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Pagar Membresia</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Ingresar Predicciones </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/EventoU"}>Eventos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Recompensas</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </div>
        )
    }
}