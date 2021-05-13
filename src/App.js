import React, { Suspense, useEffect } from "react";
import "./styles.css";
import { observer } from "mobx-react";
import { useCounterStore } from "./store/counterStore";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Notification from "./components/Notification/Notification";

// lazy import subpages
const CounterPage = React.lazy(() =>
  import("./components/CounterPage/CounterPage")
);
const AchievementsPage = React.lazy(() =>
  import("./components/AchievementsPage/AchievementsPage")
);
const ShopPage = React.lazy(() => import("./components/ShopPage/ShopPage"));

// routes array to map
const routes = [
  { path: "/counter", component: CounterPage, exact: true },
  { path: "/achievements", component: AchievementsPage, exact: false },
  { path: "/shop", component: ShopPage, exact: false }
];

const App = observer(() => {
  const counterStore = useCounterStore();

  // check for localStorage exist
  if (!localStorage.getItem("rank") && !localStorage.getItem("rankTarget")) {
    localStorage.setItem("rank", 1);
    localStorage.setItem("totalPoints", 0);
    localStorage.setItem("currentPoints", 0);
    localStorage.setItem("perSecond", 0);
    localStorage.setItem("rankTarget", 10);
    localStorage.setItem("achievementRank", 0);
    localStorage.setItem("achievementRankTarget", 100);
  }

  // toggle achievement notification
  const toggleNotification = () => {
    counterStore.setNotificationOpen(true);
    setTimeout(() => {
      counterStore.setNotificationOpen(false);
    }, 3000);
  };

  // start interval when app starting
  useEffect(() => {
    counterStore.startInterval();
  }, []); // eslint-disable-line

  // update rank and achievementRank
  useEffect(() => {
    counterStore.updateRankByTotalPoints();
    counterStore.updateAchievementRank();
  }, [counterStore, counterStore.totalPoints]);

  useEffect(() => {
    if (counterStore.achievementRank !== 0) {
      toggleNotification();
    }
  }, [counterStore.achievementRank]); // eslint-disable-line

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Suspense fallback={<Loader />}>
          {routes.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            );
          })}
        </Suspense>
      </Switch>
      <Notification />
      <Footer />
    </div>
  );
});

export default App;
