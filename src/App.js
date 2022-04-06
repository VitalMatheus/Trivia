import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './Pages/Feedback';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Ranking from './Pages/Ranking';
import Settings from './Pages/Settings';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </header>
    </div>
  );
}
