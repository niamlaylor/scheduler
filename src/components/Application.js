import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {

  // Will always default to Monday selected on page load
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  /*
  bookInterview is passed down to the Appointment index.js then is called within save(), 
  which is then passed down to Form.js. The form captures the name and interviewer and passes
  them to save() as arguments, which then updates state at the application level.
  */
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { ...appointment })
    .then(() => setState({ ...state, appointments }))
    .catch((response) => {
      console.log('There was an error with the put request: ', response);
    })
  };

  // This is our list of appointments for the current day in state
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // This is our list of interviewers for the current day in state
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // schedule is an array of Appointment components
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  });

  // Async api calls
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        {/* This Appointment component below is the last one of the day */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
