import React, { Component } from 'react';
import MapImage from "./maps/MapImage";
import MapBox from "./maps/MapBox";
import MapModal from "./maps/MapModal";
//import axios from "axios";

class Maps extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            maps: []
        }
    }

    componentDidMount() {
        fetch("/maps")
            .then(res => res.json())
            .then(maps => this.setState({maps}, () => {
                //console.log("Maps fetched..", maps);
            }));
    }

    handleOpenLightbox(e) {
        e.preventDefault();
        this.setState({
            showModal: true
        });
    }
    handleCloseMapModal(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div className="Maps">
                {this.state.showModal ? <MapModal handleCloseMapModal={this.handleCloseMapModal.bind(this)}/> : null}
                <h2>Maps</h2>
                <p>Over the course of many years I have made several maps for multiple games. Some of which are shown below.</p>
                {this.state.maps.map(map =>
                  <MapBox
                      key={map.id}
                      mapId={map.id}
                      name={map.name}
                      handleLightbox={this.handleOpenLightbox.bind(this)} />
                )}
                <div className="clear-fix"></div>

            </div>
        );
    }
}

export default Maps;
