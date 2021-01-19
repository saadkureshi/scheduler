import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function(props) {

  let InterviewListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={InterviewListItemClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt="Instructor Name"
    />
    {props.selected && props.name}
    </li> 
  );
}