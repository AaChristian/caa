import React, { Component } from 'react';
import FormSelectOption from "./FormSelectOption";

class SelectMapTypes extends Component {
    constructor() {
        super();
        this.state = {
            types: [],
            selectedAvailableTypes: []
            //selectedAvailableTypes: {}
        }
    }

    componentDidMount() {
        fetch("/map-types")
            .then(res => res.json())
            .then(types => this.setState({types}, () => {
                //console.log("Types fetched..", types);
                //console.log(this.state.maps[2]);
            }));
    }

    handleSelectOption(e) {
        let select = e.target;
        let selectedAvailableTypes = [];
        // Get all selected options in the select box
        [...select.options].filter(option => option.selected).map(option => {
            //console.log("Selected value - text: " + option.value + " - " + option.text);
            let typeId = parseInt(option.value, 10);
            let typeName = option.text;
            // If the selected option is not already selected
            if (!this.isOptionTypeAlreadySelected(this.state.selectedAvailableTypes, option)) {
                //console.log("Ikke allerede valgt!");
                // Create a object with id and name
                let objectType = {"id": typeId, "name": typeName};
                // Push to array
                selectedAvailableTypes.push(objectType);
                // Set state
                this.setState({
                    selectedAvailableTypes
                });
            }
        });
    }

    // Check if a option is alread selected by comparing every id element
    // of every object of an array with the value of the option
    isOptionTypeAlreadySelected(arrayOfObjects, option) {
        for (let i = 0; i < arrayOfObjects.length; i++) {
            if (arrayOfObjects[i].id === option.value) {
                return true;
            }
        }
        return false;
    }

    handleAddType() {
        console.log("Add type ");
    }

    isCurrentType(id) {
        for(var i = 0; i < this.props.currentTypes.length; i++) {
            if (this.props.currentTypes[i].id === id) {
                console.log("Type id " + id + " ( " + this.props.currentTypes[i].name + " ) is a current type!");
                return true;
            }
        }
        return false;
    }

    getOption(type) {
        return (
            <option
                key={type.id} value={type.id}>
                {type.name}
            </option>
        );
    }

    handleClickAddButton() {
        if (this.state.selectedAvailableTypes.length !== 0) {
            this.props.handleAddType(this.state.selectedAvailableTypes);
            this.setState({
                selectedAvailableTypes: []
            });
        }

    }

    render() {
        //console.log("All types: ", this.state.types);
        //console.log("Current types: ", this.props.currentTypes);
        console.log("Selected types: ", this.state.selectedAvailableTypes);
        return (
            <div className="select-map-types-container">
                <div className="select-map-types">
                    <select className="all-types" onChange={this.handleSelectOption.bind(this)} multiple>
                        {this.state.types.map(type => {
                            if (!this.isCurrentType(type.id)) {
                                return (
                                    <option
                                        key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </select>
                </div>
                <div className="select-map-buttons">
                    <button onClick={() => this.handleClickAddButton()}
                        disabled={this.state.selectedAvailableTypes.length === 0}
                        >&gt;</button>
                    <button>&lt;</button>
                </div>
                <div className="select-map-types">
                    <select className="selected-types" onChange={this.props.handleUserInput} multiple>
                        {this.props.currentTypes.map(type =>
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="clear-fix"></div>
	  		</div>
        );
    }
}

export default SelectMapTypes;
