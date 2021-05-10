import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class CounterStore {
  rank = JSON.parse(localStorage.getItem("rank"));
  // total points for rank and achievements
  totalPoints = JSON.parse(localStorage.getItem("totalPoints"));
  // curent points for shop
  currentPoints = JSON.parse(localStorage.getItem("currentPoints"));
  perSecond = JSON.parse(localStorage.getItem("perSecond"));
  rankTarget = JSON.parse(localStorage.getItem("rankTarget"));
  interval = "";

  constructor() {
    makeAutoObservable(this);
  }

  // main button click
  pointClick = () => {
    this.totalPoints++;
    this.currentPoints++;
    localStorage.setItem("totalPoints", this.totalPoints);
    localStorage.setItem("currentPoints", this.currentPoints);
    console.log(
      this.rank,
      this.totalPoints,
      this.currentPoints,
      this.perSecond,
      this.rankTarget
    );
  };

  // add per second - value param. from destroy machine
  addPerSecond = (value) => {
    const perSecondCopy = this.perSecond;
    const newPerSecond = perSecondCopy + value;
    this.perSecond = newPerSecond;
    localStorage.setItem("perSecond", Number(this.perSecond));
  };

  // check General - start setInterval
  startInterval = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.totalPoints += this.perSecond;
      this.currentPoints += this.perSecond;
      localStorage.setItem("totalPoints", Number(this.totalPoints));
      localStorage.setItem("currentPoints", Number(this.currentPoints));
    }, 1000);
  };

  // update rank
  updateRankByTotalPoints = () => {
    if (this.totalPoints === 10) {
      this.rank++;
      this.rankTarget = this.rankTarget * 2;
      localStorage.setItem("rank", Number(this.rank));
      localStorage.setItem("rankTarget", Number(this.rankTarget));
    } else if (
      this.totalPoints > this.rankTarget / 2 &&
      this.totalPoints >= this.rankTarget
    ) {
      this.rank++;
      this.rankTarget = this.rankTarget * 2;
      localStorage.setItem("rank", Number(this.rank));
      localStorage.setItem("rankTarget", Number(this.rankTarget));
    }
  };

  // reset all
  resetAll = () => {
    this.rank = 1;
    this.totalPoints = 0;
    this.currentPoints = 0;
    this.perSecond = 0;
    this.rankTarget = 10;
    clearInterval(this.interval);
    localStorage.setItem("rank", Number(this.rank));
    localStorage.setItem("totalPoints", Number(this.totalPoints));
    localStorage.setItem("currentPoints", Number(this.currentPoints));
    localStorage.setItem("perSecond", Number(this.perSecond));
    localStorage.setItem("rankTarget", Number(this.rankTarget));
    this.startInterval();
  };
}

// store context - with class instance
const CounterStoreContext = createContext(new CounterStore());

// provider
const CounterStoreProvider = ({ store, children }) => {
  return (
    <CounterStoreContext.Provider value={store}>
      {children}
    </CounterStoreContext.Provider>
  );
};

// hook to use counter store
const useCounterStore = () => {
  return useContext(CounterStoreContext);
};

export { CounterStore, CounterStoreProvider, useCounterStore };
