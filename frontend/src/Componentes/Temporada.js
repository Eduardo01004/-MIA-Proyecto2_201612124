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




export default class Temporada extends Component {

    state = {
    users: [],
    username:'',
    temporada:''

}

onChangeUsername = (e) => {
    this.setState({
        username: e.target.value
    })
  
  }

  onChangeTemporada = (e) => {
    this.setState({
        temporada: e.target.value
    })
  
  }

Mostrar = async e =>{
    e.preventDefault();
          const headers = {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
          await axios.post(
              'http://localhost:3030/getTemporada',
              {
              username:this.state.username,
              temporada:this.state.temporada
              },
          {headers}
          ).then(response => {
            this.setState({
                users: response.data
            })
            console.log(response.data)

          })
          .catch(error => {
              console.log("Error ========>", error);
          }
          )

  }

    render() {
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
            <div className="form-group">
                <label>Ingrese Temporada</label>
                <input type="text" className="form-control" placeholder="Temporada" onChange={this.onChangeTemporada}/>
                <label>Ingrese Usuario</label>
                <input type="text" className="form-control" placeholder="Usuario" onChange={this.onChangeUsername}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={this.Mostrar}>Submit</button>
            

            <div className = "row">
            <ul className="list-group list-group-vertical">
               
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.deporte}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.local}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.visitante}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.Pl}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.Pv}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.Rl}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.Rv}
                            </li>
                            )
                            )   
                        } 
            </ul>
            <ul className="list-group list-group-vertical">
                        {
                            this.state.users.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                {nombre.Fecha}
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