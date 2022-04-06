import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { default as Feedback, default as Ranking } from './Pages/Feedback';
import Login from './Pages/Login';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/feedback" component={ Feedback } />
          <ROute exact path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
