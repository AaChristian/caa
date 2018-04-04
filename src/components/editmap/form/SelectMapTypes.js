import React, { Component } from 'react';

class SelectMapTypes extends Component {
    constructor() {
        super();
        this.state = {
            types: [],
            selectedTypes: []
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

    render() {
        return (
            <div className="select-map-types-container">
                <div className="select-map-types">
                    <select className="all-types" onChange={this.props.handleUserInput} multiple>
                        {this.state.types.map(type =>
                            <option
                                key={type.id} value={type.id}
                                selected={this.props.currentTypes.includes(type.id)}>
                                {type.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="select-map-buttons">
                    <button onClick={(e) => this.handleAddType(this)}>&gt;</button>
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
