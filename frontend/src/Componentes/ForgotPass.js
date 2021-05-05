import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import "base-64";

export default class CrearUsuario extends Component {
  state = {
    username: '',
    correo: '',
  }

  onChangeUsername1 = (e) => {
    this.setState({
        username: e.target.value
    })

  }
  onChangeCorreo = (e) => {
    this.setState({
        correo: e.target.value
    })

  }

  onSubmit = async e =>{
    e.preventDefault();
      const res = await fetch('http://localhost:3030/Cpass',{
        
        method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },body: JSON.stringify({
        username:this.state.username,
        correo: this.state.correo
      }),
        
      });
      
      if (Number(res.status) === 200){
        Swal.fire({
          icon: "success",
          title: `Se ha enviado su cambio de password!`,
        });
        this.props.history.push('/sign-in');
      }else if (Number(res.status) === 500){
        Swal.fire({
          icon: "error",
          title: `No se pudo enviar el correo`,
        });
    }else {
      Swal.fire({
        icon: "error",
        title: `No se pudo enviar el correo`,
      });
  
    }
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

            <form onSubmit={this.onSubmit}>
            <h3>Forgot the Password</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={this.onChangeUsername1}/>
                <label>Correo</label>
                <input type="text" className="form-control" placeholder="Enter Email" onChange={this.onChangeCorreo}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Send</button>

        </form>
            </div>
        )
    }
}