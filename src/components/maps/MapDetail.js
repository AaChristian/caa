import React, { Component } from 'react';

class MapDetail extends Component {

    splitString() {
        let str = this.props.name;
        str.split(/(?=[A-Z])/).join(" ");
        str.toUpperCase();
        return str + str.slice(1);
    }

    render() {
        let ignored = ["id", "description", "Released", "download"];
        let name = this.props.name.split(/(?=[A-Z])/).join(" ").toLowerCase();
        // empty space: \u00a0
        let value = this.props.value !== "NULL" ? this.props.value : "n/a";

        if (ignored.includes(name)) {
            return null;
        }
        return (
            <div className="map-detail-item">
                    <div className="map-detail-name">{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                    <div className="map-detail-value">{value}</div>
            </div>
        );
    }
}

export default MapDetail;
