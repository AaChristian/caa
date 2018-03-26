import React, { Component } from 'react';

class ContactInfo extends Component {
    render() {
        return (
            <div className="contact-info-detail">
                <img src={"media/icons/" + this.props.icon} alt={this.props.text} />
                <span>
                    {this.props.link !== "" &&
                        <a href={this.props.link} target="_blank">
                            {this.props.text}
                        </a>
                    }
                    {this.props.link === "" && this.props.text}
                </span>
            </div>
        );
    }
}

export default ContactInfo;
