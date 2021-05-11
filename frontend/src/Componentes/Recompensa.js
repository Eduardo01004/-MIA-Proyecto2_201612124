import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import {Card, CardText, CardBody, CardTitle, CardImg,CardGroup,CardFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oro from './images/gold.png';
import Plata from './images/plata.jpeg';
import bronce from './images/bronce.png';




export default class Recompensa extends Component {

    render(){
      
        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Quiniela APP</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/carga"}>Carga Masiva</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/Jornadas"}>Jornadas</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Temporada</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/Recompesa"}>Recompensas</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/MostrarD"}>Deportes</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Reportes</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            </div>
        )
    }
}