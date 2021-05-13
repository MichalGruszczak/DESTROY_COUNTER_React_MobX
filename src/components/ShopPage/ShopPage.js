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
    requiredRank: 1,
    url: "https://i.ibb.co/S0571gG/small-gun.jpg"
  },
  {
    name: "Big Gun",
    price: 500,
    value: 5,
    requiredRank: 1,
    url: "https://i.ibb.co/L81GbLc/big-gun.png"
  },
  {
    name: "Bazooka",
    price: 1000,
    value: 10,
    requiredRank: 2,
    url: "https://i.ibb.co/MkPN0JG/bazooka.png"
  },
  {
    name: "Tank",
    price: 5000,
    value: 50,
    requiredRank: 5,
    url: "https://i.ibb.co/pdQRBKG/tank.png"
  },
  {
    name: "Artillery",
    price: 25000,
    value: 150,
    requiredRank: 8,
    url: "https://i.ibb.co/3svNPxM/artillery.jpg"
  },
  {
    name: "Heavy Bomber",
    price: 100000,
    value: 500,
    requiredRank: 10,
    url: "https://i.ibb.co/0rZBbV5/bomber.jpg"
  },
  {
    name: "Star Destroyer",
    price: 300000,
    value: 1000,
    requiredRank: 12,
    url: "https://i.ibb.co/cgp9yQs/destroyer.png"
  },
  {
    name: "Atomic Bomb",
    price: 600000,
    value: 3000,
    requiredRank: 15,
    url: "https://i.ibb.co/4YrLxfC/nuke.png"
  },
  {
    name: "Death Star",
    price: 1200000,
    value: 8000,
    requiredRank: 20,
    url: "https://i.ibb.co/8K9McS7/death-star.png"
  },
  {
    name: "Black Hole",
    price: 2500000,
    value: 15000,
    requiredRank: 25,
    url: "https://i.ibb.co/d7WFs2r/black-hole.jpg"
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
            url={item.url}
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
