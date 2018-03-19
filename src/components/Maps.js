import React, { Component } from 'react';
import MapImage from "./MapImage";

class Maps extends Component {
    constructor() {
        super();
        this.state = {
            maps: []
        }
    }

    componentDidMount() {
        fetch("/maps")
            .then(res => res.json())
            .then(maps => this.setState({maps}, () => {
                console.log("Maps fetched..", maps);
            }));
    }

    render() {
        return (
            <div className="Maps">
            <h2>Maps</h2>
            <p>Over the course of many years I have made several maps for multiple games. Some of which are shown below.</p>
                {this.state.maps.map(map =>
                    <div className="Map-list">
                    <p key={map.id}>{map.name}</p>
                    <MapImage mapId={map.id} />
                    </div>
                )}
            </div>
        );
    }
}

export default Maps;
