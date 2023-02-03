import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  
  // This hook handles state for our Application.js
  const [state, setState] = useState({
    // Will always default to Monday selected on page load
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
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { ...appointment })
    .then(() => 
      setState({ ...state, appointments }))
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({ ...state, appointments }));
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      // "all" is an array of data from the 3 api calls
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  // Pass these to Application.js for cleaner code
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};