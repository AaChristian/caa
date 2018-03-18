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
            <ul>
                {this.state.maps.map(map =>
                    <div>
                    <li key={map.id}>{map.name}</li>
                    <MapImage mapId={map.id} />
                    </div>
                )}
            </ul>
            </div>
        );
    }
}

export default Maps;
