import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import Maps from './components/Maps';
//import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Messages from "./components/Messages";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/messages" component={Messages} />
                        <Route path="/maps" component={Maps} />
                        <Route path="/contact" component={Contact} />
                        <Route path="*" render={() =>
                            <Redirect to="/"/>
                        } />
                    </Switch>
                    <Footer />
                </div>
          </Router>
        );
    }
}

export default App;
