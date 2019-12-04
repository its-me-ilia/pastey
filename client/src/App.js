import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch as Router, Route} from 'react-router-dom';
import Main from './components/Main';
import Pastey from './components/Pastey';
import Print from './components/Print';
import Raw from './components/Raw';
import Archive from './components/Archive'
const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/public-pasteys" component={Archive} />
      <Route exact path="/:code" component={Pastey} />
      <Route exact path="/:code/print" component={Print} />
      <Route exact path="/:code/raw" component={Raw} />
    </Router>
  );
}

export default App;
