
import React, { Component } from 'react'
import './popo.css'
import {  Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from "sweetalert2";
export default class MostrarDeporte extends Component {

    state = {
        deportes: [],
        nombre: '',
        color:''

    }
    async componentDidMount(){
        const res = await axios.post('http://localhost:3030/getdeporte')
        this.setState( { deportes: res.data } );
    }
    
    onChangeDeporte = (e) => {
      this.setState({
          nombre: e.target.value
      })
    
    }
    Agregar = async e =>{
      e.preventDefault();
            const headers = {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
            await axios.post(
                'http://localhost:3030/agregarDeporte',
                {
                nombre:this.state.nombre
                },
            {headers}
            ).then(response => {
              Swal.fire({
                icon: "success",
                title: `Deporte agregado con Exito!`,
              });
              console.log("Succes ========>", response);
  
            })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )
  
    }
    eliminar = async (id) =>{
      console.log(id)
            const headers = {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
            await axios.post(
                'http://localhost:3030/eliminarDeporte',
                {
                nombre:id
                },
            {headers}
            ).then(response => {
              Swal.fire({
                icon: "success",
                title: `Deporte Eliminado con Exito!`,
              });
              console.log("Succes ========>", response);
  
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
            
            <div className = "row">
            <ul className="list-group list-group-vertical">
                        {
                            this.state.deportes.map(nombre => (
                            <li className="list-group-item list-group-item-action" 
                            key={nombre.id}
                            
                            >
                                {nombre.nombre}
                            </li>
                            )
                            )
                            
                        } 
                    </ul>
                    <ul class="list-group list-group-vertical-">
                    {
                            this.state.deportes.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                <span className="badge badge-pill badge-light">{nombre.color}</span>
                            </li>
                            
                            )
                            )
                            
                        } 

                    </ul>
                    <ul class="list-group list-group-vertical-">
                    {
                            this.state.deportes.map(nombre => (
                            <li className="list-group-item list-group-item-action"
                            onDoubleClick={() => this.eliminar(nombre.nombre)}
                            >
                                <span className="badge badge-pill badge-danger">Eliminar</span>
                            </li>
                            
                            )
                            )
                            
                        } 

                    </ul>
                    <ul class="list-group list-group-vertical-">
                    {
                            this.state.deportes.map(nombre => (
                            <li className="list-group-item list-group-item-action">
                                <span className="badge badge-warning ">Modificar</span>
                            </li>
                            
                            )
                            )
                            
                        } 

                    </ul>
            </div>
            <div className="form-group">
                <label>Ingrese un Deporte</label>
                <input type="text" className="form-control" placeholder="Deporte" onChange={this.onChangeDeporte}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={this.Agregar}>Submit</button>

            </div>
        )
    }
}