import React, { Component } from 'react';
import nl2br from 'react-newline-to-break';
import ContactInfoDetails from "../contact/ContactInfoDetails";
import ManageMessage from './ManageMessage';
import Moment from 'react-moment';
import 'moment/locale/nb';

class Message extends Component {
    constructor() {
        super();
        this.state = {
            name : { icon: "008-id-card.svg", text: "", link: '' },
            email: { icon: "013-mail.svg", text: "", link: '' },
            time: { icon: "038-wall-clock.svg", text: "", link: '' },
        }
    }
    componentDidMount() {
        let name = this.state.name;
        let email = this.state.email;
        let time = this.state.time;
        name.text = this.props.message.name;
        email.text = this.props.message.email;
        email.link = "mailto:" + this.props.message.email;
        time.text = this.props.message.recieved.replace(" ", "T");
        this.setState({
            name: name,
            email: email,
            time: time
        });
        //console.log(this.props.message);
    }
    render() {
        return (
            <div className="Message-single">
                <ContactInfoDetails
                    icon={this.state.name.icon}
                    text={this.state.name.text}
                    link={this.state.name.link}
                />
                <ContactInfoDetails
                    icon={this.state.email.icon}
                    text={this.state.email.text}
                    link={this.state.email.link}
                />
                <ContactInfoDetails
                    icon={this.state.time.icon}
                    text={<Moment locale="nb" fromNow>{this.state.time.text}</Moment>}
                    link={this.state.time.link}
                />
                <div className="message-message">{nl2br(this.props.message.message)}</div>
                <ManageMessage id={this.props.message.id} deleteMessage={this.props.deleteMessage} />
            </div>
        );
    }
}

export default Message;
