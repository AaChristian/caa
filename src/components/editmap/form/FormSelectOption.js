import React, { Component } from 'react';

class FormSelectOption extends Component {
    render() {
        let opt = this.props.option;
        return (
            <option
                key={opt.id} value={opt.id}>
                {opt.name}
            </option>
        );
    }
}

export default FormSelectOption;
