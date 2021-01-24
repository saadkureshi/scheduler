export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const result = [];
  const requiredDay = day;
  const filteredAppointmentIds = state.days.filter(day => day.name === requiredDay)[0];
  if (!filteredAppointmentIds) {
    return [];
  }
  filteredAppointmentIds.appointments.forEach(id => {
    result.push(state.appointments[id]);
  })
  return result;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerId];
  const result = {...interview, interviewer: interviewerDetails};
  return result;
}

export function getInterviewsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const result = [];
  const requiredDay = day;
  const filteredAppointmentIds = state.days.filter(day => day.name === requiredDay)[0];
  if (!filteredAppointmentIds) {
    return [];
  }
  filteredAppointmentIds.interviewers.forEach(id => {
    result.push(state.interviewers[id]);
  })
  return result;
}

// we give it state and { student: "Archie Cohen", interviewer: 2 }

// desired return looks like:
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }