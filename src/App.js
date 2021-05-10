import React, { Suspense, useEffect } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { CounterStore, CounterStoreProvider } from "./store/counterStore";

// lazy import subpages
const CounterPage = React.lazy(() =>
  import("./components/CounterPage/CounterPage")
);
const SuppliesPage = React.lazy(() =>
  import("./components/SuppliesPage/SuppliesPage")
);
const AchievementsPage = React.lazy(() =>
  import("./components/AchievementsPage/AchievementsPage")
);
const ShopPage = React.lazy(() => import("./components/ShopPage/ShopPage"));

// routes array to map
const routes = [
  { path: "/counter", component: CounterPage, exact: true },
  { path: "/supplies", component: SuppliesPage, exact: false },
  { path: "/achievements", component: AchievementsPage, exact: false },
  { path: "/shop", component: ShopPage, exact: false }
];

// store - instance of store class
const counterStore = new CounterStore();

export default function App() {
  //
  // check for localStorage exist
  if (!localStorage.getItem("rank") && !localStorage.getItem("rankTarget")) {
    localStorage.setItem("rank", 1);
    localStorage.setItem("totalPoints", 0);
    localStorage.setItem("currentPoints", 0);
    localStorage.setItem("perSecond", 0);
    localStorage.setItem("rankTarget", 10);
  }

  // start interval when app starting
  useEffect(() => {
    counterStore.startInterval();
  }, []);

  return (
    <CounterStoreProvider store={counterStore}>
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
        <Footer />
      </div>
    </CounterStoreProvider>
  );
}
