import React, { Component } from 'react';
//import Maps from './Maps';
import About from './About';
import Education from './Education';
//import Contact from './Contact';

class Home extends Component {


    render() {
        return (
            <div className="Home">
                <About />
                <Education />
                {/*}<Maps handleLightbox={this.props.handleLightbox}/>*/}
                {/*<Contact />*/}
            </div>
        );
    }
}

export default Home;
