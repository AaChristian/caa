import React, { Component } from 'react';

import MapImage from "./MapImage";

class MapBox extends Component {
    render() {
        return (
          <div className="Map-box">
            <p>{this.props.name}</p>
            <MapImage
                mapId={this.props.mapId}
                handleLightbox={this.props.handleLightbox}
            />
          </div>
        );
    }
}

export default MapBox;
