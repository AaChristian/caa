import React, { Component } from 'react';

import MapImage from "./MapImage";

class MapBox extends Component {
    render() {
        let className = "map-box-name";
        if (this.props.status.toLowerCase() === "released") {
            className += " map-name-released";
        }
        return (
          <div className="Map-box">
            <div
                className={className}
                data-mapid={this.props.mapId}
                onClick={this.props.handleLightbox}>
                {this.props.name}
            </div>
            <MapImage
                mapId={this.props.mapId}
                handleLightbox={this.props.handleLightbox}
            />
          </div>
        );
    }
}

export default MapBox;
