import React from "react";
import "./counterPage.scss";
import { observer } from "mobx-react";
import AddButton from "../AddButton/AddButton";
import CounterDisplay from "../CounterDisplay/CounterDisplay";

const CounterPage = observer(() => {
  return (
    <div className="counterPage">
      <CounterDisplay />
      <AddButton />
    </div>
  );
});

export default CounterPage;
