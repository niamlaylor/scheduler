import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map((interviewer) => {

    let childrenSelected;
    props.interviewer === interviewer.id ? childrenSelected = true : childrenSelected = false;

    console.log('Props: ', props, 'Selected?: ', childrenSelected, interviewer.name)

    return (
      <InterviewerListItem
        key ={interviewer.id}
        id ={interviewer.id}
        name ={interviewer.name}
        avatar ={interviewer.avatar}
        selected ={childrenSelected}
        setInterviewer ={props.setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};