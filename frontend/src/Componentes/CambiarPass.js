import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';


export default class Cambiar extends Component {

    state = {
        username: '',
        contra: '',
      }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    
      }
      onChangePass = (e) => {
        this.setState({
            contra: e.target.value
        })
    
      }

      onSubmit = async e =>{
        e.preventDefault();
          const res = await fetch('http://localhost:3030/updatepass',{
            
            method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },body: JSON.stringify({
            username:this.state.username,
            contra: this.state.contra
          }),
            
          });
          
          if (Number(res.status) === 200){
            Swal.fire({
              icon: "success",
              title: `Se ha Cambiado su cambio de password!`,
            });
            this.props.history.push('/sign-in');
          }else if (Number(res.status) === 500){
            Swal.fire({
              icon: "error",
              title: `No se pudo Cambiar la password`,
            });
        }else {
          Swal.fire({
            icon: "error",
            title: `No se pudo Cambiar la password`,
          });
      
        }
      }

    render() {

        return(
            <div className="App">
            <form onSubmit={this.onSubmit}>
            <h3>Forgot the Password</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={this.onChangeUsername}/>
                <label>Password</label>
                <input type="text" className="form-control" placeholder="Enter Email" onChange={this.onChangePass}/>
                <label>Confirm Password</label>
                <input type="text" className="form-control" placeholder="Enter Email"/>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Cambiar</button>

        </form>
            </div>
        )
    }
}