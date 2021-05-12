
import React, { Component } from 'react'
import {  Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import time from '@fullcalendar/timegrid';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from "sweetalert2";
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Button } from 'reactstrap'

export default class Jornadas extends Component {
  state2 = {
    Events: []
  }

state ={
    calendarWeekends: true,
    calendarEvents: []
    
}
async componentDidMount() {
  await axios.post("http://localhost:3030/getEvento")
  .then(response => {
  response.data.forEach(element => {
    this.state2.Events.push(element)
    
    
  });
  this.setState({
    calendarEvents: this.state2.Events
  })
});
//console.log(this.state.calendarEvents)
} 
    render() {
        return (
          <div className="App" style = {{width:'100%', height:"100%"}}>
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
                    <Link className="nav-link" to={"/Temporada"}>Temporada</Link>
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

            <div id="Calendario">
                    <br/> <br/>
                    <FullCalendar
                        plugins={[ dayGridPlugin, listPlugin, time, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'dayGridMonth,timeGridWeek,listYear',
                            center: 'title,today',
                            right: 'prevYear,prev,next,nextYear'
                        }}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        locale = {'es'}
                        //initialEvents = {this.Ingresar_eventos()}
                        events={this.state.calendarEvents}
                        //select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        //eventClick={this.handleEventClick}
                    />
                </div>
            </div>
        )
}
}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }