import React from "react";

import "components/InterviewerListItem.scss";

// import "components/DayListItem.scss";

export default function InterviewerListItem(props) {

  let interviewerSelected = '';
  if (props.selected) {
    interviewerSelected = '--selected'
  };

  return (
    <li className={`interviewers__item${interviewerSelected}`} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};