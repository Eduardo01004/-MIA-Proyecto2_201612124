import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
export default class Carga extends Component {
    
  state = {
    datos : ''

  }
  


   openFile = (evt) =>{ 
    const fileObj = evt.target.files[0];
    const reader = new FileReader(); 
    let fileloaded = e => {
      this.setState({
        datos: e.target.result

      })
      
      

    }
    fileloaded = fileloaded.bind(this);
    reader.onload = fileloaded;
    reader.readAsText(fileObj);
};
 Enviar = async e =>{
  const yaml = require('js-yaml')
  const obj = yaml.load(this.state.datos)
  var dato = JSON.stringify(obj, null, 2)
  await axios.post('http://localhost:3030/carga', dato).then(
      result => {
          console.log("Se envio la informacion");
          Swal.fire({
            icon: "success",
            title: `Se ha cargado con exito`,
          });
          //console.log(dato)
      }
  ).catch(console.log)
}
  

    render(){
      
        

        
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
                  <span>Choose file</span>
                
                <input type='file' name='Archivo' onChange= {this.openFile} />
                <br/><br/>
                <button className="btn btn-primary" onClick={this.Enviar}  >Cargar Archivo</button>

            </div>
        )
        }
}