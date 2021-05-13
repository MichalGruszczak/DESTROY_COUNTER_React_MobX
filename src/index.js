import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CounterStore, CounterStoreProvider } from "./store/counterStore";

// store - instance of store class
const counterStoreForProvider = new CounterStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CounterStoreProvider store={counterStoreForProvider}>
      <Router>
        <App />
      </Router>
    </CounterStoreProvider>
  </StrictMode>,
  rootElement
);
