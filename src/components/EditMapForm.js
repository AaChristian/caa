import React, { Component } from 'react';



class EditMapForm extends Component {
    render() {
        let map = this.props.map;
        return (
            <div className="map-edit-form-container">
                <div>{map.name}</div>
                <div className="map-edit-form-general">
                    <input
                        type="text" name="name" className="map-edit-input"
                        value={map.name} onChange={this.props.handleUserInput}/>
                    <input
                        type="text" name="type" className="map-edit-input"
                        value={map.type} onChange={this.props.handleUserInput}/>
                    <input
                        type="text" name="game" className="map-edit-input"
                        value={map.game} onChange={this.props.handleUserInput}/>
                    <input
                        type="text" name="difficulty" className="map-edit-input"
                        value={map.difficulty} onChange={this.props.handleUserInput}/>
                </div>
                <div className="map-edit-form-images">

                </div>
            </div>
        );
    }
}

export default EditMapForm;
