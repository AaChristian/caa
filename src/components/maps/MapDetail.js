import React, { Component } from 'react';

class MapDetail extends Component {

    splitString() {
        let str = this.props.name;
        str.split(/(?=[A-Z])/).join(" ");
        str.toUpperCase();
        return str + str.slice(1);
    }

    render() {
        let ignored = ["id", "gameId", "description", "Released", "download", "progress"];
        let name = this.props.name;
        // empty space: \u00a0
        let value = this.props.value !== "NULL" && this.props.value.length !== 0 ? this.props.value : "n/a";
        console.log(name);
        if (ignored.includes(name)) {
            return null;
        }
        name = name.split(/(?=[A-Z])/).join(" ").toLowerCase();
        return (
            <div className="map-detail-item">
                    <div className="map-detail-name">{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                    <div className="map-detail-value">
                        {Array.isArray(value) ?
                            value.map((val, index) =>
                                <span>{value[index].name}{index < value.length - 1 ? ',\u00A0' : ''}</span>
                            )
                            : value}
                    </div>
            </div>
        );
    }
}

export default MapDetail;
