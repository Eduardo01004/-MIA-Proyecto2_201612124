import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Card from 'react-bootstrap/Card';
import Oro from './images/gold.png';
import Plata from './images/plata.jpeg';
import bronce from './images/bronce.png';
import {Card, CardText, CardBody, CardTitle, CardImg,CardGroup,CardFooter} from 'reactstrap';
export default class InicioAdmin extends Component {
    
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

            <CardGroup>
            <Card>
                <CardImg variant="top" src={Oro} />
                <CardBody>
                <CardTitle>ORO</CardTitle>
                <CardText>
                    TOTAL.
                </CardText>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardImg variant="top" src={Plata} />
                <CardBody>
                <CardTitle>PLATA</CardTitle>
                <CardText>
                    TOTAL
                </CardText>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardImg variant="top" src={bronce} />
                <CardBody>
                <CardTitle>BRONCE</CardTitle>
                <CardText>
                    TOTAL
                </CardText>
                </CardBody>
                <CardFooter>
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