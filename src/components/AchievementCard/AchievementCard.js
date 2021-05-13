import React from "react";
import "./achievementCard.scss";

const AchievementCard = (props) => {
  return (
    <div
      className={
        props.achieved
          ? "achievementCard"
          : "achievementCard achievementCard--locked"
      }
    >
      <div className="achievementCard__photo">{props.photo}</div>
      <div className="achievementCard__name">{props.name}</div>
      <div className="achievementCard__required">{props.required}</div>
    </div>
  );
};

export default AchievementCard;
