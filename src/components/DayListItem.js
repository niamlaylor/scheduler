import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  let dayClass = '';
  if (props.selected) {
    dayClass = '--selected'
  }
  if (props.spots === 0) {
    dayClass = '--full'
  }

  let dayListClass = classNames(`day-list__item${dayClass}`);

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
};