import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class CounterStore {
  rank = 1;
  // total points for rank and achievements
  totalPoints = 0;
  // curent points for shop
  currentPoints = 0;
  perSecond = 0;
  rankTarget = 10;

  constructor() {
    makeAutoObservable(this);
  }

  // main button click
  pointClick = () => {
    this.totalPoints++;
    this.currentPoints++;
  };

  // add per second - value param. from destroy machine
  addPerSecond = (value) => {
    const perSecondCopy = this.perSecond;
    const newPerSecond = perSecondCopy + value;
    this.perSecond = newPerSecond;
  };

  // check General - start setInterval
  clickGeneralStartInterval = () => {
    this.perSecond += 1;
    const interval = setInterval(() => {
      this.totalPoints += this.perSecond;
      this.currentPoints += this.perSecond;
    }, 1000);
    if (this.perSecond === 0) clearInterval(interval);
  };

  // update rank
  updateRankByTotalPoints = () => {
    if (this.totalPoints === 10) {
      this.rank++;
      this.rankTarget = this.rankTarget * 2;
    } else if (
      this.totalPoints > this.rankTarget / 2 &&
      this.totalPoints >= this.rankTarget
    ) {
      this.rank++;
      this.rankTarget = this.rankTarget * 2;
    }
  };

  // reset all
  resetAll = () => {
    this.rank = 1;
    this.totalPoints = 0;
    this.currentPoints = 0;
    this.perSecond = 0;
    this.rankTarget = 10;
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
