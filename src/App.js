import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './components/Header';
import Home from './components/Home';
import Maps from './components/Maps';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

import RouteTest from "./components/RouteTest";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/router" component={RouteTest} />
                <Footer />
            </div>
      </Router>
    );
  }
}

export default App;
