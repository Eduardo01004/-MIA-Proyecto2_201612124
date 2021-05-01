import React, { Component } from 'react'
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import "base-64";
import { base64StringToBlob } from 'blob-util';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Plata from '/home/eduardo/go/src/hola/imagenes/Eduardo21';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg,CardGroup,CardFooter} from 'reactstrap';


export default class Perfil extends Component {
  handleClick = async e =>{
    e.preventDefault();
    const  tp =  JSON.parse(localStorage.getItem("usuarioActual"));
          const headers = {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
        const  respuesta =  await axios.post(
              'http://localhost:3030/obU',
              {
              username:tp.username,
              },
          {headers}
          ).then(response => {
            //const cas = response.json();
              this.setState({
                username: response.data.username,
                contra:   response.data.contra,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                tier: response.data.tier,
                fecha_naciemiento: response.data.fecha_naciemiento,
                fecha_registro: response.data.fecha_registro,
                correo: response.data.correo,
                foto: "/home/eduardo/go/src/imagenes/Eduardo21.JPEG",
                base64 : tp.base64
                
   
            })
            this.Contrasena = response.data.username
              //console.log("respusta: " + cas.username)
          })
          .catch(error => {
              console.log("Error ========>", error);
          }
          )
  }
  Contrasena = '';
 //imageName = require('/home/eduardo/go/src/hola/imagenes/Eduardo21');
  state = {
    username: '',
    contra: '',
    nombre: '',
    apellido: '',
    tier: '',
    fecha_naciemiento: '',
    fecha_registro: '',
    correo: '',
    foto: '',
    tipo: 1,
    base64: ''

}
onSubmit = async e =>{
     
    }
    render(){
     
        return(


            <div className="container-fluid">
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
                      <Link className="nav-link" to={"/sign-up"}>Eventos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>Recompensas</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
                
            
            
            <div className="row justify-content-right">
                <div className="col-4">
                <Card style={{ width: '10rem' }}>
                <CardImg variant="bot" src={"data:image/png;base64,"+ this.state.base64}  />
                <CardBody>
                    <CardText>
                    <input 
                    type='file'
                    name='Archivo' 
                    />
                    </CardText>
                </CardBody>
                </Card>
            </div>
            </div>
            <h3>Profile</h3>
            <fieldset disabled>
            <div className="mb-3">
            
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Username</label>
                <input type="text" id="disabledTextInput" className="form-control"   placeholder={this.state.username}  />
            
            </div>
          </fieldset>
            <div className="mb-3">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nombre</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.nombre} />
            </div>

            <div className="mb-3">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Apellido</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.apellido} />
            </div>
            <fieldset disabled>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput">Fecha de Registro</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.fecha_registro} />
            </div>
            </fieldset>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput">Fecha de Nacimiento</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.fecha_naciemiento} />
            </div>
            <div className="mb-3" >
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <input type="email" className="form-control form-control-sm" placeholder={this.state.correo} />
            </div>

            <div className="mb-3" >
            
            </div>
            <button type="submit" className="btn btn-primary btn-block">Modificar</button>
            
            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}>Mostrar Datos</button>
            
            </div>

            
        )
    }
}