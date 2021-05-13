import React from "react";
import "./counterPage.scss";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";

const CounterPage = observer(() => {
  const counterStore = useCounterStore();

  return (
    <div className="counterPage">
      <h1>rank: {counterStore.rank}</h1>
      <h2>ach rank: {counterStore.achievementRank} </h2>
      <h2>ach. rank target: {counterStore.achievementRankTarget}</h2>
      <h1>total points: {counterStore.totalPoints}</h1>
      <h1>current points: {counterStore.currentPoints}</h1>
      <h1>per second: {counterStore.perSecond}</h1>
      <button onClick={counterStore.pointClick}>add point</button>
      <button onClick={() => counterStore.addPerSecond(10, 9)}>
        heavy bomber
      </button>
      <button onClick={counterStore.resetAll}>RESET</button>
    </div>
  );
});

export default CounterPage;
