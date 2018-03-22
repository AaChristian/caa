import React, { Component } from 'react';

class Lightbox extends Component {
    render() {
        return (
            <div className="modal">
                <span class="close cursor" onclick="closeModal()">&times;</span>
                <p>Lightbox!</p>
            </div>
        );
    }
}

export default Lightbox;
