import React, { Component } from 'react'
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Swal from "sweetalert2";
export default class Carga extends Component {

    render(){
        var openFile = function(evt) { 
            let status = [];
            const fileObj = evt.target.files[0];
            const reader = new FileReader(); 
            let fileloaded = e => {
              console.log(e.target.result)
              Swal.fire({
                icon: "success",
                title: `Se ha cargado con exito`,
              });

            }
            fileloaded = fileloaded.bind(this);
            reader.onload = fileloaded;
            reader.readAsText(fileObj);
        };
        return(

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
                      <Link className="nav-link" to={"/sign-up"}>Jornadas</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Temporada</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Recompensas</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Deportes</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Reportes</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <h1 className="h2">Carga Masiva</h1>
                <br/><br/>
                <input type='file' name='Archivo' onChange= {evt => openFile(evt)}/>
                <br/><br/>
                <button className="btn btn-primary"  >Cargar Archivo</button>

            </div>
        )
        }
}