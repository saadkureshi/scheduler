import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const interviewers = getInterviewsForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = day => setState(prev => ({ ...prev, day: day }));

  function bookInterview(id, interview) {

    console.log(id, interview);

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
      appointments
    });

    return axios.put(`/api/appointments/${id}`,{interview})
      .then(response => {
      console.log(response)
    })
  }

  function cancelInterview(id, interview) {

    console.log(id, interview);

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
        appointments
      }));
    })

  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

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
          day={state.day}
          setDay={setDay}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


// export default function Application(props) {
//   const {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   } = useApplicationData();

//   const interviewers = getInterviewersForDay(state, state.day);

//   const appointments = getAppointmentsForDay(state, state.day).map(
//     appointment => {
//       return (
//         <Appointment
//           key={appointment.id}
//           {...appointment}
//           interview={getInterview(state, appointment.interview)}
//           interviewers={interviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
//         />
//       );
//     }
//   );

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         <section className="schedule">
//           {appointments}
//           <Appointment key="last" time="5pm" />
//         </section>
//       </section>
//     </main>
//   );
// }