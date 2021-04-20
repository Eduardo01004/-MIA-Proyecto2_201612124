import React from 'react';

import Login from './Componentes/Login';
import './App.css';
import CreateUser from './Componentes/CrearUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  return (
    <Router>

      

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={CreateUser} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
