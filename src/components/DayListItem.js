import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  // let dayClass = '';
  // if (props.selected) {
  //   dayClass = '--selected';
  // };
  // if (props.spots === 0) {
  //   dayClass = '--full';
  // };

  // let dayListClass = classNames(`day-list__item${dayClass}`);
  let dayListClass = classnames(`day-list__item`, { '--selected': props.selected}, {'--full': props.spots === 0}).split(' ').join('');

  return (
    <li data-testid="day" className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
    </li>
  );
};