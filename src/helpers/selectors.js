const getMatchingAppointments = (returnValue, apptList, stateAppointments) => {
  for (const appointment of apptList) {
    if (stateAppointments[appointment]) {
      returnValue.push(stateAppointments[appointment]);
    }
  } return returnValue;
};

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