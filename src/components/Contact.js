import React, { Component } from 'react';
import FormErrors from "./FormErrors";

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            body: '',
            formErrors: {name: '', email: '', body: ''},
            nameValid: false,
            emailValid: false,
            bodyValid: false,
            formValid: false,
        }
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        let bodyValid = this.state.bodyValid;
        switch(fieldName) {
            case "name":
                nameValid = value.length !== 0;
                fieldValidationErrors.name = nameValid ? "" : "Fyll inn navn.";
                break;
            case "email":
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? "" : "Eposten er ugyldig.";
                break;
            case "body":
                fieldValidationErrors.body = value.length === 0 ? "Fyll inn kommentarer." : "";
                break;
            default:
                fieldValidationErrors.name = this.state.name === "" ? "Fyll inn navn." : "";
                fieldValidationErrors.email = this.state.email === "" ? "Fyll inn epost adresse." : "";
                fieldValidationErrors.body = this.state.body === "" ? "Fyll inn kommentarer." : "";
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors
        }, this.validateForm);
    }

    validateForm() {
        let valid = true;
        let errors = this.state.formErrors;
        //this.setState({formValid: this.state.formErrors.name == ""});
        for (var key in errors) {
            if (errors[key] !== "") {
                valid = false;
            }
        }
        this.setState({formValid: valid});
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted..", {

        });
        console.log(this.state);
        /*fetch("/send-mail", {
          method: "POST",
      });*/
    }

    render() {
        let errors = this.state.formErrors;
        return (
            <div className="Contact">
                <h2>Kontakt</h2>
                <div id="contact-info">
                    Min kontakt info her..
                </div>
                <div id="contact-form">
                    <div className="contact-form-errors">
                        {(errors.name !== "" || errors.body !== "" || errors.email !== "") ? <FormErrors formErrors={this.state.formErrors} /> : null}
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input
                                type="text" name="name" className="contact-input"
                                value={this.state.name} onChange={this.handleUserInput.bind(this)}
                                placeholder="Navn"/>
                        </div>
                        <div>
                            <input type="text" name="email" className="contact-input"
                                value={this.state.email} onChange={this.handleUserInput.bind(this)}
                                placeholder="E-post"/>
                        </div>
                        <div>
                            <textarea name="body" placeholder="Hva lurer du på?"
                                value={this.state.body} onChange={this.handleUserInput.bind(this)}/>
                        </div>
                        <div>
                            <input type="submit" name="submit" className="contact-submit"
                                disabled={!this.state.formValid} value="Send"/>
                        </div>
                    </form>
                </div>
                <div className="clear-fix"></div>
            </div>
        );
    }
}

export default Contact;
