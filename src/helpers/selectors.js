export function getAppointmentsForDay(state, day) {

  let appointments = [];

  if (state.days.length === 0) {
    return appointments;
  };

  let appointmentsOnDay = state.days.filter(d => d.name === day);

  if (appointmentsOnDay.length === 0) {
    return appointments;
  } else {
    appointmentsOnDay = state.days.filter(d => d.name === day)[0].appointments;
    appointmentsOnDay.forEach((appointment) => {
      if (state.appointments[appointment]) {
        appointments.push(state.appointments[appointment]);
      };
    });
    return appointments;
  };
};


export function getInterviewersForDay(state, day) {

  let interviewers = [];

  if (state.days.length === 0) {
    return interviewers;
  }

  let interviewersOnDay = state.days.filter(d => d.name === day);

  if (interviewersOnDay.length === 0) {
    return interviewers;
  } else {
    interviewersOnDay = state.days.filter(d => d.name === day)[0].interviewers;
    interviewersOnDay.forEach((interviewer) => {
      interviewers.push(state.interviewers[interviewer])
    })
  };
  return interviewers;
};

/*
This function will return an object that contains the interview 
data if it is passed an object that contains an interviewer.
*/
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  };

  let interviews = {
    ...interview, 
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviews;
};
// Sample return value:
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

export default function getAppointmentDay(state, id) {
  for (const day of state.days) {
    if (day.appointments.includes(id)) {
      return day;
    };
  };
};

// We use this helper in getNewSpotCount below
export default function getNullAppointments(state, day) {
  let nullCount = 0;
  for (const appointment of day.appointments) {
    const stateAppointment = state.appointments[appointment].interview;
    if (stateAppointment === null) {
      nullCount++;
    };
  } return nullCount;
};

export default function getNewSpotCount(state, selectedDay, booking) {
  const days = state.days.map((d) => {
    // We set booking to true if using the bookInterview function or false for cancelInterview
    if (d.id === selectedDay.id && booking) {
      d = {...d, spots: getNullAppointments(state, selectedDay) - 1};
      return d;
    } else if (d.id === selectedDay.id && !booking) {
      d = {...d, spots: getNullAppointments(state, selectedDay) + 1};
      return d;
    } else {
      return d;
    };
  });
  return days;
}