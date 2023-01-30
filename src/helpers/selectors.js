import { getMatchingAppointments } from "./selectorsHelpers";

export function getAppointmentsForDay(state, day) {

  const appointmentDetails = [];

  if (state.days.length === 0) {
    return appointmentDetails;
  };

  const filteredDays = state.days.filter(d => d.name === day);

  if (filteredDays.length === 0) {
    return appointmentDetails;
  } else {
    // This helper loops the state.appointments and pushes matches to appointmentDetails
    return getMatchingAppointments(appointmentDetails, filteredDays[0].appointments, state.appointments);
  };
};


export function getInterviewersForDay(state, day) {

  const interviewers = [];

  if (state.days.length === 0) {
    return interviewers;
  }

  const filteredDays = state.days.filter(d => d.name === day);

  if (filteredDays.length === 0) {
    return interviewers;
  } else {
    for (const interviewer of filteredDays[0].interviewers) {
      interviewers.push(state.interviewers[interviewer])
    };
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