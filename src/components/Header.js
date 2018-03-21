import React, { Component } from 'react';
import Navigation from './Navigation';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="App-header">
                    <h1 className="App-title">Christian Aashamar</h1>
                    <h4>Portfolio</h4>
                </div>
                <Navigation />
            </header>
        );
    }
}

export default Header;
