import React, { Component } from 'react';



class EditMapForm extends Component {
    render() {
        let map = this.props.map;
        return (
            <div className="map-edit-form-container">
                <h3>{map.name}</h3>
                <div className="map-edit-form-general">
                    <div className="map-edit-label">Navn</div>
                    <div className="map-edit-input">
                        <input
                            type="text" name="name" className="map-edit-input"
                            value={map.name} onChange={this.props.handleUserInput}/>
                    </div>
                    <div className="map-edit-label">Game</div>
                    <div className="map-edit-input">
                        <input
                            type="text" name="game" className="map-edit-input"
                            value={map.game} onChange={this.props.handleUserInput}/>
                    </div>
                    <div className="map-edit-label">Type</div>
                    <div>
                        <input
                            type="text" name="type" className="map-edit-input"
                            value={map.type} onChange={this.props.handleUserInput}/>
                    </div>
                    <div className="map-edit-label">Length</div>
                    <div>
                        <input
                            type="text" name="length" className="map-edit-input"
                            value={map.length} onChange={this.props.handleUserInput}/>
                    </div>
                    <div className="map-edit-label">Difficulty</div>
                    <div>
                        <input
                            type="text" name="difficulty" className="map-edit-input"
                            value={map.difficulty} onChange={this.props.handleUserInput}/>
                    </div>
                    <div className="map-edit-label">Description</div>
                        <textarea
                            name="description" value={map.description}
                            onChange={this.props.handleUserInput}/>
                    <div>
                        <input
                            type="submit" name="submit" className="map-edit-submit"
                            value="Submit" onClick={this.props.handleSubmitChanges}/>
                        <button
                            className="contact-test--btn"
                            onClick={this.props.handleResetForm}
                            >Reset
                        </button>
                    </div>
                    <div className="clear-fix"></div>
                </div>
                <div className="map-edit-form-images">
                    Slette og lette til bilder her (eget skjema)
                </div>
            </div>
        );
    }
}

export default EditMapForm;
