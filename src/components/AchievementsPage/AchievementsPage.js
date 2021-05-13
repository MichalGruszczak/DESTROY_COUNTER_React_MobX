import React from "react";
import "./achievementsPage.scss";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";
import AchievementCard from "../AchievementCard/AchievementCard";
import { availableAchievements } from "../../store/counterStore";

const AchievementsPage = observer(() => {
  const counterStore = useCounterStore();

  return (
    <div className="achievementsPage">
      <h2 className="achievementsPage__totalPoints">
        Total DP's: {counterStore.totalPoints}
      </h2>
      {availableAchievements.map((item) => {
        return (
          <AchievementCard
            key={item.name}
            name={item.name}
            required={item.required}
            url={item.url}
            achieved={counterStore.totalPoints >= item.required ? true : false}
          />
        );
      })}
      <button
        className="achievementsPage__reset"
        onClick={counterStore.resetAll}
      >
        RESET ALL
      </button>
    </div>
  );
});

export default AchievementsPage;
