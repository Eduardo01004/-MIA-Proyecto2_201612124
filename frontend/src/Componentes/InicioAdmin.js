import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import {Card, CardText, CardBody, CardTitle, CardImg,CardGroup,CardFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oro from './images/gold.png';
import Plata from './images/plata.jpeg';
import bronce from './images/bronce.png';




export default class InicioAdmin extends Component {

  oro = ""
  silver = ""
  bronce = ""
  state = {
    temporada: '',
    tier: '',
    gold:'',
    silver:'',
    bronce:''

  }

  onChangeTemporada = (e) => {
    this.setState({
        temporada: e.target.value
    })
  
  }

Buscar = async e =>{
      e.preventDefault();
            const headers = {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',};
            await axios.post(
                'http://localhost:3030/getTier',
                {
                membresia: 'gold',
                temporada: this.state.temporada,

                },
            {headers}
            ).then(response => {
              this.oro =  response.data.cantidad.toString()
              console.log("succes ========>", response);
              console.log(this.state.gold)
  
            })
            .catch(error => {
                console.log("Error ========>", error);
            }
            )
            //-----------------
            await axios.post(
              'http://localhost:3030/getTier',
              {
              membresia: 'silver',
              temporada: this.state.temporada,

              },
          {headers}
          ).then(response => {
            this.silver =  response.data.cantidad.toString()
            console.log("succes ========>", response);
            console.log(this.state.gold)

          })
          .catch(error => {
              console.log("Error ========>", error);
          }
          )
          //------------------------
          await axios.post(
            'http://localhost:3030/getTier',
            {
            membresia: 'bronze',
            temporada: this.state.temporada,

            },
        {headers}
        ).then(response => {
          this.bronce =  response.data.cantidad.toString()
          console.log("succes ========>", response);
          console.log(this.state.gold)

        })
        .catch(error => {
            console.log("Error ========>", error);
        }
        )
  
  }
    render(){
      
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
                      <Link className="nav-link" to={"/sign-up"}>Temporada</Link>
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
                <label>Buscar Temporada</label>
                <input type="text" className="form-control" placeholder="temporada" onChange={this.onChangeTemporada}/>            
            <button type="submit" className="btn btn-primary btn-block" onClick={this.Buscar}>Submit</button>

            </div>

            <CardGroup>
            <Card>
                <CardImg variant="top" src={Oro} />
                <CardBody>
                <CardTitle>ORO</CardTitle>
                <CardText>
                    
                </CardText>
                </CardBody>
                <CardFooter>
               total: {this.oro}
                </CardFooter>
            </Card>
            <Card>
                <CardImg variant="top" src={Plata} />
                <CardBody>
                <CardTitle>PLATA</CardTitle>

                </CardBody>
                <CardFooter>
                total: {this.silver}
                </CardFooter>
            </Card>
            <Card>
                <CardImg variant="top" src={bronce} />
                <CardBody>
                <CardTitle>BRONCE</CardTitle>
                </CardBody>
                <CardFooter>
                total: {this.bronce}
                </CardFooter>
            </Card>
            </CardGroup>
            <div className="row g-2">
    <div className="col-md">
        <div className="form-floating">
        <input type="text" className="form-control" placeholder="TOTAL RECAUDADO" defaultValue="RECAUDADO" />
        <label >25000</label>
        </div>
    </div>
    </div>

            </div>
        
        );
    }
}