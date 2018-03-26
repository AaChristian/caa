import React, { Component } from 'react';

class MapModal extends Component {
    render() {
        return (
            <div className="modal">
                <span className="close cursor" onClick={this.props.handleCloseMapModal}>&times;</span>
                {/*<span className="close cursor" onClick="closeModal()">&times;</span>*/}
                <div className="modal-content">
                    <p>MapModal!</p>
                </div>
            </div>
        );
    }
}

export default MapModal;
