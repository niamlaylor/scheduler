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

const state2 = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

export function getInterview(state, interview) {
  const interviews = {};

  // const filteredInterviews;
  
};