/*import React, { Component } from 'react';

class FormErrors extends Component {
    render() {
        return (
            <div className="form-errors">
                {this.props.formErrors.map((errorName, value) => {
                    if (this.props.formErrors[errorName].length > 0) {
                        <p>{this.props.formErrors[errorName]}</p>
                    }
                })}
            </div>
        );
    }
}

export default FormErrors;*/

import React from "react";
const FormErrors = ({formErrors}) =>
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors;
