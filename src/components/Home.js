import React, { Component } from 'react';
import Maps from './Maps';
import About from './About';
import Contact from './Contact';

class Home extends Component {
    render() {
        return (
            <div>
                <About />
                <Maps />
                <Contact />
            </div>
        );
    }
}

export default Home;
