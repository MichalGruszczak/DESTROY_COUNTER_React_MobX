import React from "react";
import "./addButton.scss";
import { useCounterStore } from "../../store/counterStore";

const AddButton = () => {
  const counterStore = useCounterStore();

  return <button onClick={counterStore.pointClick}>Add Point</button>;
};

export default AddButton;
