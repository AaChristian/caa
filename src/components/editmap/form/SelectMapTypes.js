import React, { Component } from 'react';
import FormSelectOption from "./FormSelectOption";

class SelectMapTypes extends Component {
    constructor() {
        super();
        this.state = {
            types: [],
            //selectedTypes: []
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

    render() {
        //console.log("All types: ", this.state.types);
        //console.log("Current types: ", this.props.currentTypes);
        return (
            <div className="select-map-types-container">
                <div className="select-map-types">
                    <select className="all-types" onChange={this.props.handleUserInput} multiple>
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
                    <button onClick={this.props.handleAddType}>&gt;</button>
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
