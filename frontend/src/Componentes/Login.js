import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import Swal from "sweetalert2";


export default class Login extends Component {
  
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  state = {
    username: '',
    contra: '',
  }

  onChangeUsername1 = (e) => {
    this.setState({
        username: e.target.value
    })

  }

onChangeContra1 = (e) => {
  this.setState({
      contra: e.target.value
  })

}

onSubmit = async e =>{
  e.preventDefault();
    const res = await fetch('http://localhost:3030/login',{
      
      method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },body: JSON.stringify({
      username:this.state.username,
      contra: this.state.contra,
    }),
      
    });
    
    if (Number(res.status) === 200){
      const respuesta = await res.json();
      //console.log(respuesta.username)
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          username: respuesta.username,
          contra: respuesta.contra,
          base64: respuesta.base64
          
        })
      );
      //console.log(localStorage.getItem("usuarioActual"));
      Swal.fire({
        icon: "success",
        title: `¡Bienvenid@ ${this.state.username}!`,
      });
      if (respuesta.username == "admin"){
        this.props.history.push('/iniAd');
      }else {
        this.props.history.push('/iniUs');
      }
      
    }else if (Number(res.status) === 500){
      Swal.fire({
        icon: "error",
        title: `Credenciales invalidas`,
      });
  }else {
    Swal.fire({
      icon: "error",
      title: `No se pudo Iniciar sesion`,
    });

  }
}
    render() {
      localStorage.clear();
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
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={this.onChangeUsername1}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangeContra1}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>

            <p className="forgot-password text-right">
                Forgot <a href="/perfil">password?</a>
            </p>
        </form>
        </div>
        );
    }
}
