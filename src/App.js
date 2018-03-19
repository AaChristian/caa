import React, { Component } from 'react';
import Maps from './components/Maps';
import Navigation from './components/Navigation';
import About from './components/About';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Christian Aashamar</h1>
          <h4>Portfolio</h4>
          <Navigation />
        </header>
        <About />
        <Maps />
        <Footer />
      </div>
    );
  }
}

export default App;
