import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import "base-64";


export default class CrearUsuario extends Component {
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

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
            foto: "imagenes/"+e.target.value
        })

    }
    onChangeContra = (e) => {
        this.setState({
            contra: e.target.value
        })

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
    onChangeTier = (e) => {
        this.setState({
            tier: parseInt(e.target.value)
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

    onSubmit = async e =>{

        const fecha = new Date();
        e.preventDefault();
        const headers = {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
        await axios.post(
            'http://localhost:3030/pruebapost',
            {
            username:this.state.username,
            contra: this.state.contra,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            tier:this.state.tier,
            fecha_naciemiento:this.state.fecha_naciemiento,
           
            fecha_registro: fecha.getDate()+ "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
            correo: this.state.correo,
            foto: this.state.foto,
            base64:this.state.base64
            },
        {headers}
        ).then(response => {
            console.log("Success ========>", response);
            Swal.fire({
                icon: "success",
                title: `Usuario Creado con Exito!`,
              });
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
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Username" onChange={this.onChangeUsername} />
                </div>

                <div className="mb-3">
                    <input type="password" className="form-control form-control-sm"  placeholder="Enter password" onChange={this.onChangeContra} />
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="First name" onChange={this.onChangeName}/>
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Last name" onChange={this.onChangeLastname}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Tier" onChange={this.onChangeTier}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm"  placeholder="Fecha Nacimiento" onChange={this.onChangeFechaNac}/>
                </div>
               

                <div className="mb-3" >
                    <input type="email" className="form-control form-control-sm" placeholder="Enter email" onChange={this.onChangeEmail} />
                </div>

                <div className="mb-3" >
                <input 
                type='file' file
                name='Archivo' 
                onChange= {this.openFile}/>
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
