import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Plata from '/home/eduardo/go/src/hola/imagenes/Eduardo21';
import {Card, CardText, CardBody, CardImg} from 'reactstrap';


export default class Perfil extends Component {
  handleClick = async e =>{
    e.preventDefault();
    const  tp =  JSON.parse(localStorage.getItem("usuarioActual"));
          const headers = {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
           await axios.post(
              'http://localhost:3030/obU',
              {
              username:tp.username,
              },
          {headers}
          ).then(response => {
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
            
            console.log("Succes ========>", response)
          })
          .catch(error => {
              console.log("Error ========>", error);
          }
          )
  }
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
estado2 = {
  username: '',
  nombre: '',
  apellido: '',
  fecha_naciemiento: '',
  correo: '',
  foto: '',
  base64: ''

}
  update = async e =>{
    e.preventDefault();
    const  tp =  JSON.parse(localStorage.getItem("usuarioActual"));
          const headers = {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
          await axios.post(
              'http://localhost:3030/update',
              {
              username:tp.username,
              nombre: this.state.nombre,
              apellido: this.state.apellido,
              fecha_naciemiento:this.state.fecha_naciemiento,            
              correo: this.state.correo,
              foto: "imagenes/"+ tp.username,
              base64:this.state.base64
              },
          {headers}
          ).then(response => {
            Swal.fire({
              icon: "success",
              title: `Usuario Modificado con Exito!`,
            });
            console.log("Succes ========>", response);

          })
          .catch(error => {
              console.log("Error ========>", error);
          }
          )

  }
  onChangeName = (e) => {
    this.setState({
        nombre: e.target.value
    })
}

onChangeLastname = (e) => {
  this.setState({
      apellido: e.target.value
  })

}
onChangeFechaNac = (e) => {
  this.setState({
      fecha_naciemiento: e.target.value
  })

}
onChangeEmail = (e) => {
  this.setState({
      correo: e.target.value
  })

}
onChangeEmail = (e) => {
  this.setState({
      correo: e.target.value
  })

}
openFile = (evt) =>{ 
  const file = evt.target.files[0]
  const base64 =  this.Base64(file)
             
};

Base64 = (file) => {
return new Promise((resolve,reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>{
      resolve(fileReader.result);
      let s = fileReader.result
      let p = s.split(',')
      this.setState({
          base64: p[1]    
      })
                   
    };
    
 return fileReader.result   

});
};
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
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>Cerrar Sesion</Link>
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
                    onChange= {this.openFile} 
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
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.nombre} onChange={this.onChangeName} />
            </div>

            <div className="mb-3">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Apellido</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.apellido} onChange={this.onChangeLastname} />
            </div>
            <fieldset disabled>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput">Fecha de Registro</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.fecha_registro} />
            </div>
            </fieldset>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput">Fecha de Nacimiento</label>
                <input type="text" className="form-control form-control-sm"  placeholder={this.state.fecha_naciemiento}  onChange={this.onChangeFechaNac} />
            </div>
            <div className="mb-3" >
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <input type="email" className="form-control form-control-sm" placeholder={this.state.correo} onChange={this.onChangeEmail}/>
            </div>

            <div className="mb-3" >
            
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={this.update}>Modificar</button>
            
            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}>Mostrar Datos</button>
            
            </div>

            
        )
    }
}