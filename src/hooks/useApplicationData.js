import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day: day }));
  
  function bookInterview(id, interview) {

    console.log(id, interview);
    const days = [...state.days];
    days.forEach(day => {
      if (day.name === state.day && !state.appointments[id].interview) {
        day.spots -= 1;
      }
    })

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments,
      days
    });

    return axios.put(`/api/appointments/${id}`,{interview})
      .then(response => {
      console.log(response)
    })
  }

  function cancelInterview(id, interview) {

    console.log(id, interview);

    const days = [...state.days];
    days.forEach(day => {
      if (day.name === state.day) {
        day.spots += 1;
      }
    })

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
      console.log(response)
      setState(prev => ({
        ...prev,
        appointments,
        days
      }));
    })
  }
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}



