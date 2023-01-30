export function getAppointmentsForDay(state, day) {

  const appointments = [];

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