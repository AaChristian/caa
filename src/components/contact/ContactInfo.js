import React, { Component } from 'react';
import ContactInfoDetails from "./ContactInfoDetails";

class ContactInfo extends Component {
    constructor() {
        super();
        this.state = {
            contactDetails: [
                { icon: "032-placeholder.svg", text: "Norge", link: '' },
                { icon: "029-telephone-1.svg", text: "+47 98675442", link: '' },
                { icon: "013-mail.svg", text: "chrizzy89@gmail.com", link: 'mailto:chrizzy89@gmail.com' },
                { icon: "031-link.svg", text: "LinkedIn", link: 'https://www.linkedin.com/in/christian-aashamar-00ba33158/' },
            ]
        }
    }

    render() {
        return (
            <div id="contact-info">
                <p>Send meg en epost, melding eller bruk skjemaet til høyre så kommer jeg tilbake til deg så fort som mulig.</p>
                {this.state.contactDetails.map(detail =>
                    <ContactInfoDetails
                        key={detail.icon}
                        icon={detail.icon}
                        text={detail.text}
                        link={detail.link}
                    />
                )}
            </div>
        );
    }
}

export default ContactInfo;
