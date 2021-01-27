import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "Saving";
  const DELETING = "Deleting";
  const CONFIRM = "Are you sure you would like to delete?";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(() => {
      transition(ERROR_SAVE, true)
    });
  }
  // name, interviewer => arguments for below
  function deleteInterview() {
    // const interview = {
    //   student: name,
    //   interviewer
    // };
    transition(DELETING, true);
    props.cancelInterview(props.id, null)
    .then(() => transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
    });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}

      {mode === ERROR_SAVE && (
        <Error
        message="Error Saving Appointment"
        onClose={back} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Error Deleting Appointment"
        onClose={back} 
        />
      )}
      {mode === CONFIRM && 
        <Confirm 
          message={CONFIRM} 
          onCancel={() => transition(SHOW)}
          onConfirm={deleteInterview}
          />}
      {mode === EDIT && 
      <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
      />
      }
      {mode === DELETING && <Status message={DELETING} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  );
}