import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import MapEditImages from "./MapEditImages";

import 'react-datepicker/dist/react-datepicker.css';

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
                    {map.progress === 100 &&
                        <div>
                            <div className="map-edit-label">Release date</div>
                            <div>
                                <DatePicker
                                    selected={map.releaseDate !== "NULL" ? moment(map.releaseDate) : moment()}
                                    onChange={this.props.handleChangeDate}
                                    />
                            </div>
                        </div>
                    }
                    <div className="map-edit-label">Progress ({map.progress + "%"})</div>
                    <div>
                        <input
                            type="range" name="progress" className="map-edit-progress"
                            min="0" max="100" value={map.progress}
                            disabled={map.status.toLowerCase() === "released" ? true : false}
                            onChange={this.props.handleUserInput} />
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
