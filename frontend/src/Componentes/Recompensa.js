import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import axios from 'axios';
import './otro.css'
import Swal from "sweetalert2";
import {Card, CardText, CardBody, CardTitle, CardImg,CardGroup,CardFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oro from './images/gold.png';
import Plata from './images/plata.jpeg';
import bronce from './images/bronce.png';




export default class Recompensa extends Component {
  state = {
    users: []

}

async componentDidMount(){
  const res = await axios.post('http://localhost:3030/getrecompensa')
  this.setState( { users: res.data } );
}

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
                    <Link className="nav-link" to={"/Temporada"}>Temporada</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Recompensa"}>Recompensas</Link>
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
            
            <div className = "row" >
            <ul className="list-group list-group-vertical">
            <li className="list-group-item list-group-item-action">username</li>
              {
                  this.state.users.map(nombre => (
                  <li className="list-group-item list-group-item-action"                 
                  >
                      {nombre.username}
                  </li>
                  )
                  )            
              } 
            </ul>

            <ul className="list-group list-group-vertical">
            <li className="list-group-item list-group-item-action">name</li>
              {
                  this.state.users.map(nombre => (
                  <li className="list-group-item list-group-item-action"                 
                  >
                      {nombre.nombre}
                  </li>
                  )
                  )            
              } 
            </ul>
            <ul className="list-group list-group-vertical">
            <li className="list-group-item list-group-item-action">Apellido</li>
              {
                  this.state.users.map(nombre => (
                  <li className="list-group-item list-group-item-action"                 
                  >
                      {nombre.apellido}
                  </li>
                  )
                  )            
              } 
            </ul>

            <ul className="list-group list-group-vertical">
            <li className="list-group-item list-group-item-action" color="#fafcb5">Tier</li>
              {
                  this.state.users.map(nombre => (
                  <li className="list-group-item list-group-item-action"                 
                  >
                      {nombre.tier}
                  </li>
                  )
                  )            
              } 
            </ul>
            
            
            </div>


            </div>
        )
    }
}