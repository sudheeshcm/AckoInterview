import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import IssueListing from "./Components/IssueListing/IssueListing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={IssueListing} />
        </Switch>
      </div>
    );
  }
}

export default App;
