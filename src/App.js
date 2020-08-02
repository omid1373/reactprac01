import React , {Component} from 'react';
import './App.css';
import {BrowserRouter , Route, Switch} from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contact from './components/Contact';
import Login from './components/Login';
import About from "./components/About";

class App extends Component{
    render() {
        return (
            <React.Fragment>
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
                {/*<div className="loading"><div className="loader"></div>*/}
                {/*</div>*/}
            </BrowserRouter>
            </React.Fragment>
        );
    }
}
export default App;
