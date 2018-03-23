import React, { Component } from 'react';
//import Maps from './Maps';
import About from './About';
//import Contact from './Contact';

class Home extends Component {


    render() {
        return (
            <div>
                <About />
                {/*}<Maps handleLightbox={this.props.handleLightbox}/>*/}
                {/*<Contact />*/}
            </div>
        );
    }
}

export default Home;
