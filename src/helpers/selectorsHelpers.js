export function getMatchingAppointments(returnValue, apptList, stateAppointments) {
  for (const appointment of apptList) {
    if (stateAppointments[appointment]) {
      returnValue.push(stateAppointments[appointment]);
    }
  } return returnValue;
};