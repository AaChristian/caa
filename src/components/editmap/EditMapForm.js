import React, { Component } from 'react';
import MapEditFormLeft from "./form/MapEditFormLeft";
import MapEditFormRight from "./form/MapEditFormRight";
import MapEditFormBottom from "./form/MapEditFormBottom";
import MapEditImages from "./MapEditImages";

import 'react-datepicker/dist/react-datepicker.css';

class EditMapForm extends Component {
    render() {
        let map = this.props.map;
        //console.log("map: ", this.props);
        return (
            <div className="map-edit-form-container">
                <h3>{map.name}</h3>
                <div className="map-edit-form-general">
                    <MapEditFormLeft
                        map={map}
                        handleUserInput={this.props.handleUserInput}
                        handleSelectGame={this.props.handleSelectGame}
                        handleAddType={this.props.handleAddType}
                     />
                    <MapEditFormRight map={map} handleUserInput={this.props.handleUserInput} />
                    <MapEditFormBottom
                        map={map}
                        handleUserInput={this.props.handleUserInput}
                        handleSubmitChanges={this.props.handleSubmitChanges}
                        handleResetForm={this.props.handleResetForm}
                     />
                </div>
                <MapEditImages
                    mapId={map.id}
                    images={this.props.mapImages}
                    handleDeleteImage={this.props.handleDeleteImage}
                    handleFileSelect={this.props.handleFileSelect}
                    handleFileSubmit={this.props.handleFileSubmit}
                    fileValid={this.props.fileValid}
                />
            </div>
        );
    }
}

export default EditMapForm;
