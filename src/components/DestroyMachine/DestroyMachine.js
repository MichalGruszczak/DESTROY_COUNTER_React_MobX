import React from "react";
import { useCounterStore } from "../../store/counterStore";
import "./destroyMachine.scss";

const DestroyMachine = (props) => {
  const counterStore = useCounterStore();

  // check props to assign class - nonvisible/ disabled/ normal
  const checkClassName = () => {
    if (props.visible && !props.disabled) return "destroyMachine";
    else if (props.visible && props.disabled)
      return "destroyMachine destroyMachine--disabled";
    else if (!props.visible) return "destroyMachine destroyMachine--nonvisible";
  };

  return (
    <button
      onClick={() => counterStore.addPerSecond(props.value, props.price)}
      className={checkClassName()}
      disabled={props.disabled}
    >
      <div className="destroyMachine__name">{props.name}</div>
      <div className="destroyMachine__photo">hello</div>
      <div className="destroyMachine__price">{props.price}</div>
      <div className="destroyMachine__value">{props.value}</div>
    </button>
  );
};

export default DestroyMachine;
