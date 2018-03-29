import React, { Component } from 'react';
import EditMapForm from "./EditMapForm";

class EditMap extends Component {
    constructor() {
        super();
        this.state = {
            maps: [],           // All the maps fetched from database
            mapIndex: null,     // Index of map selected
            mapEdit: null       // Map selected, this is what is changed when editing
        }
    }

    componentDidMount() {
        fetch("/maps")
            .then(res => res.json())
            .then(maps => this.setState({maps}, () => {
                console.log("Maps fetched..", maps);
                //console.log(this.state.maps[2]);
            }));
    }

    handleSelectMap(e) {
        console.log("changed: " + e.target.value);
        let mapId = e.target.value;
        let maps = this.state.maps;
        let mapIndex = null;
        if (e.target.value !== "-1") {
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
        }
        this.setState({
            mapIndex: mapIndex,
            mapEdit: this.state.maps[mapIndex]
        });
    }

    handleResetForm() {
        console.log("Resetting form..");
        let mapIndex = this.state.mapIndex;
        this.setState({
            mapEdit: this.state.maps[mapIndex]
        });
    }
    /* Update state with changes and save to database */
    //// TODO: Save changes in database
    handleSubmitChanges() {
        console.log("Time to submit changes..");
        let mapIndex = this.state.mapIndex;
        let maps = this.state.maps;
        maps[mapIndex] = this.state.mapEdit;
        this.setState({
            maps: maps
        });

    }

    handleUserInput(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        this.setState(prevState => ({
            mapEdit: {
                ...prevState.mapEdit,
                [inputName]: inputValue
            }
        }));
    }

    render() {
        console.log(this.state);
        return (
            <div className="map-edit-container">
                <div>Edit map here..</div>
                <div className="map-edit-select-container">
                    <ul>
                        {this.state.maps.map(map =>
                            <li
                                key={map.id}
                                value={map.id}
                                onClick={this.handleSelectMap.bind(this)}>{map.name}</li>
                        )}
                    </ul>
                </div>
                {this.state.mapIndex !== null &&
                    <EditMapForm
                        map={this.state.mapEdit}
                        handleUserInput={this.handleUserInput.bind(this)}
                        handleResetForm={this.handleResetForm.bind(this)}
                        handleSubmitChanges={this.handleSubmitChanges.bind(this)}
                    />
                }
                <div className="clear-fix"></div>
            </div>
        );
    }
}

export default EditMap;
