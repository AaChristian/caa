import React, { Component } from 'react';

class Lightbox extends Component {
    render() {
        return (
            <div className="modal">
                <span className="close cursor" onClick="closeModal()">&times;</span>
                <p>Lightbox!</p>
            </div>
        );
    }
}

export default Lightbox;
