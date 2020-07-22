import React from 'react';
import './App.css';
import {BrowserRouter , Route, Switch} from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contact from './components/Contact';
import Login from './components/Login';
import About from "./components/About";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
