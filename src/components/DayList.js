import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days.map((day) => {
    let childrenSelected;
    props.day === day.name ? childrenSelected = true : childrenSelected = false;

    return (
      <DayListItem
        key ={day.id}
        id ={day.id}
        name ={day.name}
        spots ={day.spots}
        selected ={childrenSelected}
        setDay ={props.setDay}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
};