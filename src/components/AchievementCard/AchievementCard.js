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
      <div
        className="achievementCard__photo"
        style={{ backgroundImage: `url(${props.url})` }}
      >
        {props.photo}
      </div>
      <div className="achievementCard__name">{props.name}</div>
      <div className="achievementCard__required">{props.required} DP's</div>
    </div>
  );
};

export default AchievementCard;
