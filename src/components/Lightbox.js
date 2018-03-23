import React, { Component } from 'react';

class Lightbox extends Component {
    render() {
        return (
            <div className="modal">
                <span className="close cursor" onClick={this.props.handleCloseLightbox}>&times;</span>
                {/*<span className="close cursor" onClick="closeModal()">&times;</span>*/}
                <div className="modal-content">
                    <p>Lightbox!</p>
                </div>
            </div>
        );
    }
}

export default Lightbox;
