import React, { Component } from 'react';
import EditMapForm from "./EditMapForm";

class EditMap extends Component {
    constructor() {
        super();
        this.state = {
            maps: [],           // All the maps fetched from database
            mapIndex: null,     // Index of map selected
            mapEdit: null,       // Map selected, this is what is changed when editing
            mapEditImages: [],
            selectedFile: null,
            fileValid: false
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
            mapEdit: this.state.maps[mapIndex],
            selectedFile: null,
            fileValid: false
        });
        fetch(`/maps/${mapId}/images`)
            .then(res => res.json())
            .then(mapEditImages => this.setState({mapEditImages}, () => {
                console.log("Images fetched..", mapEditImages);
                //console.log(this.state.maps[2]);
            }));
    }

    getMapImages() {
        fetch(`/maps/${this.state.mapEdit.id}/images`)
            .then(res => res.json())
            .then(mapEditImages => this.setState({mapEditImages}, () => {
                console.log("Images fetched..", mapEditImages);
                //console.log(this.state.maps[2]);
            }));
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
        console.log(maps[mapIndex].id);
        let {id, progress, status, releaseDate, download, ...data} = this.state.mapEdit;
        console.log(data);

        fetch(`/maps/${maps[mapIndex].id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        //.then(res => res.json())
        .then(res => {
            //this.getMapImages();
        })

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

    handleDeleteImage(id) {
        console.log("Gonna delete image with id: " + id);
        console.log(`/images/${id}`);
        fetch(`/images/${id}`, {
            method: "DELETE"
        }).then(res => {
            console.log("Image deleted!");
            //this.getMessages()
            this.getMapImages();
        })
    }

    handleFileSelect(e) {
        let file = e.target.files[0];
        let fileValid = true;
        console.log("Selected file..", file);
        // If File size is greater than 1 MB
        if (file.size > 1048576) {
            console.log("File size too big!");
            fileValid = false;
        }

        this.setState({
            selectedFile: e.target.files[0],
            fileValid: fileValid
        });
    }

    handleFileSubmit(e) {
        e.preventDefault();
        console.log("Time to submit image..");
        var data = new FormData();
        data.append("mapName", this.state.mapEdit.name);
        data.append("mapId", this.state.mapEdit.id);
        data.append("mapImage", this.state.selectedFile, this.state.selectedFile.name);
        fetch("/upload-map-image", {
            method: "POST",
            body: data
        })
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            // Update the state with the newly inserted file to update UI
            /*let mapEditImages = this.state.mapEditImages;
            mapEditImages.push(res);
            this.setState({
                mapEditImages: mapEditImages
            });*/
            this.getMapImages();
        })
    }

    render() {
        //console.log(this.state);
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
                        mapImages={this.state.mapEditImages}
                        handleUserInput={this.handleUserInput.bind(this)}
                        handleResetForm={this.handleResetForm.bind(this)}
                        handleSubmitChanges={this.handleSubmitChanges.bind(this)}
                        handleDeleteImage={this.handleDeleteImage.bind(this)}
                        handleFileSelect={this.handleFileSelect.bind(this)}
                        handleFileSubmit={this.handleFileSubmit.bind(this)}
                        fileValid={this.state.fileValid}
                    />
                }
                <div className="clear-fix"></div>
            </div>
        );
    }
}

export default EditMap;
