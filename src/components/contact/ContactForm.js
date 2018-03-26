import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import FormMessages from "./FormMessages";

class ContactForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            message: '',
            formErrors: {name: '', email: '', message: ''},
            formMessage: '',
            formValid: false
        }
    }

    handleTestMsgClick() {
        let paras = Math.floor(Math.random() * 3) + 1;
        fetch("https://baconipsum.com/api/?type=all-meat&paras=" + paras)
            .then(res => res.json())
            .then (res => {
                //console.log(res);
                var message = "";
                for (var i = 0; i < res.length; i++) {
                    message += i === 0 ? res[i] : "\n\n" + res[i];
                }
                //console.log(message);
                this.setState({
                    message: message
                }, () => { this.validateForm() })
            })
        //this.validateForm();
    }

    handleTestNameClick() {
        let firstName = Math.random().toString(36).substr(2, 5);
        let lastName = Math.random().toString(36).substr(2, 5);
        let name = firstName + " " + lastName;
        this.setState({
            name: name
        }, () => { this.validateForm() })
        //this.validateForm();
    }

    handleTestMailClick() {
        let email = Math.random().toString(36).substr(2, 6) + "@domain.com";
        this.setState({
            email: email
        }, () => { this.validateForm() })
        //this.validateForm();
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateForm() })
    }

    validateForm() {
        let valid = true;
        let errors = this.state.formErrors;
        //this.setState({formValid: this.state.formErrors.name == ""});
        if (this.state.name === "") { valid = false; }
        if (this.state.message === "") { valid = false; }
        if (this.state.email === "") { valid = false; errors.email = ""; }
        if (this.state.email !== "") {
            let emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if(!emailValid) {
                errors.email = "Eposten er ugyldig."
                valid = false;
            } else {
                errors.email = "";
            };
        }
        this.setState({
            formValid: valid,
            formErrors: errors,
            formMessage: ''
        });
        //console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        };
        this.postMessage(data);
    }

    postMessage(data) {
        //console.log(data);
        fetch("/contactMessages", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            //console.log("Form submitted and posted!");
            this.setState({
                name: '',
                email: '',
                message: '',
                formErrors: {name: '', email: '', message: ''},
                formMessage: "Melding lagret!",
                formValid: false
            });
        })
    }

    render() {
        let errors = this.state.formErrors;
        return (
            <div id="contact-form">
                <div className="contact-form-info">
                    {(errors.name !== "" || errors.body !== "" || errors.email !== "") &&
                        <FormErrors formErrors={this.state.formErrors} />
                    }
                    {this.state.formMessage !== "" && <FormMessages formMessage={this.state.formMessage}/>}
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
                        <textarea name="message" placeholder="Hva lurer du på?"
                            value={this.state.message} onChange={this.handleUserInput.bind(this)}/>
                    </div>
                    <div>

                        <input type="submit" name="submit" className="contact-submit"
                            disabled={!this.state.formValid} value="Send"/>
                    </div>
                </form>
                {process.env.NODE_ENV !== "production" &&
                    <div>
                        <button className="contact-test--btn" onClick={this.handleTestNameClick.bind(this)}>Test navn</button>
                        <button className="contact-test--btn" onClick={this.handleTestMailClick.bind(this)}>Test epost</button>
                        <button className="contact-test--btn" onClick={this.handleTestMsgClick.bind(this)}>Test message</button>
                    </div>
                }
            </div>
        );
    }
}

export default ContactForm;
