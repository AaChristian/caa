import React, { Component } from 'react';
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <h2>Kontakt</h2>
                <ContactInfo />
                <ContactForm />
                <div className="clear-fix"></div>
            </div>
        );
    }
}

export default Contact;
