import React from "react";
import "./addButton.scss";
import { useCounterStore } from "../../store/counterStore";

const AddButton = () => {
  const counterStore = useCounterStore();

  return (
    <button className="addButton" onClick={counterStore.pointClick}></button>
  );
};

export default AddButton;
