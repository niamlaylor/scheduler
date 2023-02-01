import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  // See hooks/useVisualMode.js for how these constants are used in custom hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Called when we save the form. This changes the state variable at the application level.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  };

  function remove() {
    const interview = null;
    transition(DELETING);
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          id={props.interview.id}
          onDelete={remove}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETING && <Status message={'Deleting...'}/>}
    </article>
  );
};