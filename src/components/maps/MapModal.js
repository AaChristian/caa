import React, { Component } from 'react';
import MapDetail from "./MapDetail";

class MapModal extends Component {
    render() {
        let map = this.props.map;
        console.log(map);
        if (!map) {
            return null;
        }
        return (
            <div className="Map-modal">
                <span className="close cursor" onClick={this.props.handleCloseMapModal}>&times;</span>
                {/*<span className="close cursor" onClick="closeModal()">&times;</span>*/}
                <div className="modal-content">
                    <h2>{map.name}</h2>
                    <div className="map-details">
                        {Object.keys(map).map((key,value) =>
                            <MapDetail key={key} name={key} value={map[key]} />
                        )}
                    </div>
                    {map.status !== "Released" && map.progress !== "NULL" &&
                    <div><h4>Progress</h4>
                    <div className="map-progress-container">
                        <div className="map-progress" style={{width: map.progress + "%"}}>{map.progress + "%"}</div>
                    </div>
                    </div>
                    }
                    {map.description !== "NULL" &&
                    <div className="map-info">
                        <h4>Description</h4>
                        <div className="map-info-text">
                            <div>{map.description}</div>
                        </div>
                    </div>
                    }
                    <div className="map-images">
                        Bilder her..
                    </div>
                </div>
            </div>
        );
    }
}

export default MapModal;
