import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

// available achievements
export const availableAchievements = [
  { name: "Hedge", required: 100 },
  { name: "Wall", required: 500 },
  { name: "Barracks", required: 1000 },
  { name: "Infantry bunker", required: 3000 },
  { name: "Tanks formation", required: 8000 },
  { name: "Enemy Division", required: 24000 },
  { name: "Enemy HQ", required: 70000 },
  { name: "Village", required: 210000 },
  { name: "Small City", required: 630000 },
  { name: "Medium City", required: 2000000 },
  { name: "Capital City", required: 6000000 },
  { name: "Country", required: 20000000 },
  { name: "Continent", required: 60000000 },
  { name: "Earth", required: 180000000 },
  { name: "Galaxy", required: 1000000000 }
];

// achievements targets
const achievementRankTargetsArray = availableAchievements.map(
  (item) => item.required
);

class CounterStore {
  rank = JSON.parse(localStorage.getItem("rank"));
  totalPoints = JSON.parse(localStorage.getItem("totalPoints")); // for rank and achievements
  currentPoints = JSON.parse(localStorage.getItem("currentPoints")); // for shop
  perSecond = JSON.parse(localStorage.getItem("perSecond"));
  rankTarget = JSON.parse(localStorage.getItem("rankTarget"));
  interval = "";
  notificationOpen = false;
  achievementRank = JSON.parse(localStorage.getItem("achievementRank"));
  achievementRankTarget = JSON.parse(
    localStorage.getItem("achievementRankTarget")
  );

  constructor() {
    makeAutoObservable(this);
  }

  // update achievementRank by totalPoints
  updateAchievementRank = () => {
    if (this.totalPoints >= this.achievementRankTarget) {
      this.achievementRank++;
      this.achievementRankTarget =
        achievementRankTargetsArray[this.achievementRank];
      localStorage.setItem("achievementRank", Number(this.achievementRank));
      localStorage.setItem(
        "achievementRankTarget",
        Number(this.achievementRankTarget)
      );
    }
  };

  // open/close achievement notification
  setNotificationOpen = (bool) => {
    this.notificationOpen = bool;
  };

  // main button click
  pointClick = () => {
    this.totalPoints++;
    this.currentPoints++;
    localStorage.setItem("totalPoints", this.totalPoints);
    localStorage.setItem("currentPoints", this.currentPoints);
  };

  // add per second - value param. from destroy machine
  addPerSecond = (value, price) => {
    const perSecondCopy = this.perSecond;
    const newPerSecond = perSecondCopy + value;
    this.perSecond = newPerSecond;
    localStorage.setItem("perSecond", Number(this.perSecond));
    const currentPointsCopy = this.currentPoints;
    const newCurrentPoints = currentPointsCopy - price;
    this.currentPoints = newCurrentPoints;
    localStorage.setItem("currentPoints", Number(this.currentPoints));
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
    this.achievementRank = 0;
    this.achievementRankTarget = 100;
    clearInterval(this.interval);
    localStorage.setItem("rank", Number(this.rank));
    localStorage.setItem("totalPoints", Number(this.totalPoints));
    localStorage.setItem("currentPoints", Number(this.currentPoints));
    localStorage.setItem("perSecond", Number(this.perSecond));
    localStorage.setItem("rankTarget", Number(this.rankTarget));
    localStorage.setItem("achievementRank", Number(this.achievementRank));
    localStorage.setItem(
      "achievementRankTarget",
      Number(this.achievementRankTarget)
    );
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
