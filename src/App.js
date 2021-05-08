import React, { Suspense } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

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

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Suspense fallback={<Loader />}>
          {routes.map((item) => {
            return (
              <Route
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
  );
}
