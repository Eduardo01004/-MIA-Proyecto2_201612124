import React from 'react';

import Login from './Componentes/Login';
import './App.css';
import CreateUser from './Componentes/CrearUsuario';
import InicioAdmin from './Componentes/InicioAdmin';
import Carga from './Componentes/Carga';
import InicioUser from './Componentes/InicioUser';
import Perfil from './Componentes/Perfil';
import Forgot from './Componentes/ForgotPass';
import Cambiar from './Componentes/CambiarPass';
import Mostrar from './Componentes/MostrarDeporte';
import Jornadas from './Componentes/Jornadas';
import Recompensa from './Componentes/Recompensa';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <Router>

      

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={CreateUser} />
            <Route path="/iniAd" component={InicioAdmin} />
            <Route path="/carga" component={Carga} />
            <Route path="/iniUs" component={InicioUser} />
            <Route path="/perfil" component={Perfil} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/CambiarP" component={Cambiar} />
            <Route path="/MostrarD" component={Mostrar} />
            <Route path="/Jornadas" component={Jornadas} />
            <Route path="/Recompensa" component={Recompensa} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}



export default App;
