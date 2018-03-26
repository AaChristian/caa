import React, { Component } from 'react';

class FormMessages extends Component {
    render() {
        return (
            <div className="formMessages">
                <p>{this.props.formMessage}</p>
            </div>
        );
    }
}

export default FormMessages;
