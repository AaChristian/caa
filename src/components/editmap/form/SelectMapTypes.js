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

    render() {
        //console.log(this.props);
        return (
          <select className="select-map-types" onChange={this.props.handleUserInput} multiple>
              {this.state.types.map(type =>
                  <option
                      key={type.id} value={type.name}
                      selected={this.props.currentType.includes(type.name)}>
                      {type.name}
                  </option>
              )}
          </select>
        );
    }
}

export default SelectMapTypes;
