import React, { Component } from 'react';
import MapBox from "./maps/MapBox";
import MapModal from "./maps/MapModal";
//import axios from "axios";

class Maps extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            maps: [],
            mapIndex: null
        }
    }

    componentDidMount() {
        fetch("/maps")
            .then(res => res.json())
            .then(maps => this.setState({maps}, () => {
                //console.log("Maps fetched..", maps);
                //console.log(this.state.maps[2]);
            }));
    }

    handleOpenMapModal(e) {
        e.preventDefault();
        // Get mapId from the custom attribute on the event target
        let mapId = e.target.dataset.mapid;
        let maps = this.state.maps;
        let mapIndex = null;
        /*
        Iterate through all the map objects, if the id of teh object matches the mapId
        of the event target, then set the mapIndex and break the loop.
        The mapIndex is used to send the correct map information to the MapModal component.
        */
        for (var i = 0; i < maps.length; i++) {
            if (parseInt(maps[i].id, 10) === parseInt(mapId, 10)) {
                //console.log(maps[i].name);
                mapIndex = i;
                break;
            }
        }

        this.setState({
            showModal: true,
            mapIndex: mapIndex
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
                {this.state.showModal ?
                    <MapModal
                        map={this.state.maps[this.state.mapIndex]}
                        handleCloseMapModal={this.handleCloseMapModal.bind(this)}/>
                    : null}
                <h2>Maps</h2>
                <p>Over the course of many years I have made several maps for multiple games. Some of which are shown below.</p>
                {this.state.maps.map(map =>
                  <MapBox
                      key={map.id}
                      mapId={map.id}
                      name={map.name}
                      status={map.status}
                      handleLightbox={this.handleOpenMapModal.bind(this)} />
                )}
                <div className="clear-fix"></div>

            </div>
        );
    }
}

export default Maps;
