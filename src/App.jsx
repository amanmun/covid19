import React from "react";
import Hometheme from "./components/Hometheme";
import {HashRouter as Router} from 'react-router-dom'

const App = () => {

  return (
    <Router>
      <Hometheme />
    </Router>
  );
};

export default App;