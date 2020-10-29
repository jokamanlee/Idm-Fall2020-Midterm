import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Films from "./containers/Films";

import FilmListing from "./containers/FilmListing";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/film/:title">
          <Films />
        </Route>
        <Route path="/">
          <FilmListing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
