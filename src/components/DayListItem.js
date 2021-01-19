import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  let DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (remainingSpots) => {
    if (remainingSpots > 1) {
      return `${remainingSpots} spots remaining`;
    } else if (remainingSpots === 1) {
      return `1 spot remaining`;
    } else {
      return `no spots remaining`;
    }
  }

  return (
    <li className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}