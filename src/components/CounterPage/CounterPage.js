import React, { useEffect } from "react";
import "./counterPage.scss";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";

const CounterPage = observer(() => {
  const counterStore = useCounterStore();

  // update rank
  useEffect(() => {
    counterStore.updateRankByTotalPoints();
  }, [counterStore, counterStore.totalPoints]);

  return (
    <div className="counterPage">
      <h1>rank: {counterStore.rank}</h1>
      <h1>total points: {counterStore.totalPoints}</h1>
      <h1>current points: {counterStore.currentPoints}</h1>
      <h1>per second: {counterStore.perSecond}</h1>
      <button onClick={counterStore.pointClick}>add point</button>
      <button onClick={() => counterStore.addPerSecond(10)}>
        heavy bomber
      </button>
      <button onClick={counterStore.resetAll}>RESET</button>
    </div>
  );
});

export default CounterPage;
