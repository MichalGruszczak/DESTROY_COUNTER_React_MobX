import React from "react";
import "./shopPage.scss";
import DestroyMachine from "../DestroyMachine/DestroyMachine";
import { observer } from "mobx-react";
import { useCounterStore } from "../../store/counterStore";

// array of destroy machines
const machines = [
  {
    name: "Small Gun",
    price: 100,
    value: 1,
    requiredRank: 1
  },
  {
    name: "Big Gun",
    price: 500,
    value: 5,
    requiredRank: 1
  },
  {
    name: "Bazooka",
    price: 1000,
    value: 10,
    requiredRank: 2
  },
  {
    name: "Tank",
    price: 5000,
    value: 50,
    requiredRank: 5
  },
  {
    name: "Artillery",
    price: 25000,
    value: 150,
    requiredRank: 8
  },
  {
    name: "Heavy Bomber",
    price: 100000,
    value: 500,
    requiredRank: 10
  },
  {
    name: "Star Destroyer",
    price: 300000,
    value: 1000,
    requiredRank: 12
  },
  {
    name: "Atomic Bomb",
    price: 600000,
    value: 3000,
    requiredRank: 15
  },
  {
    name: "Death Star",
    price: 1200000,
    value: 8000,
    requiredRank: 20
  },
  {
    name: "Black Hole",
    price: 2500000,
    value: 15000,
    requiredRank: 25
  }
];

const ShopPage = observer(() => {
  const counterStore = useCounterStore();

  return (
    <div className="shopPage">
      <h3>Per second : {counterStore.perSecond}</h3>
      {machines.map((item) => {
        return (
          <DestroyMachine
            key={item.name}
            name={item.name}
            price={item.price}
            value={item.value}
            disabled={counterStore.currentPoints >= item.price ? false : true}
            visible={counterStore.rank >= item.requiredRank ? true : false}
          />
        );
      })}
    </div>
  );
});

export default ShopPage;
