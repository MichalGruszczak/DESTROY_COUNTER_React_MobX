import React from "react";
import "./counterDisplay.scss";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";

const CounterDisplay = observer(() => {
  const counterStore = useCounterStore();

  return (
    <div className="counterDisplay">
      <h2 className="counterDisplay__rank">Rank: {counterStore.rank}</h2>
      <h2 className="counterDisplay__points">
        Destroy Points: {counterStore.currentPoints}
      </h2>
      <h4 className="counterDisplay__perSecond">
        Per second: {counterStore.perSecond}
      </h4>
    </div>
  );
});

export default CounterDisplay;
