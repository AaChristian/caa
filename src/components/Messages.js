import React, { Component } from 'react';
import Message from "./messages/Message";

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.getMessages();
    }

    getMessages() {
        fetch("/contactMessages")
            .then(res => res.json())
            .then(messages => this.setState({messages}, () => {
                //console.log("Messages fetched..", messages);
            }));
    }

    deleteMessage(e) {
        console.log("Clicked..");
        console.log(`/contactMessages/${e.target.id}`);
        fetch(`/contactMessages/${e.target.id}`, {
            method: "DELETE"
        }).then(res => {
            this.getMessages()
        })
        //console.log(this.state);
    }

    render() {
        return (
            <div className="Messages">
                <h2>Meldinger</h2>
                {this.state.messages.length === 0 && <div className="no-messages">Ingen meldinger..</div>}
                {this.state.messages.length !== 0 &&
                this.state.messages.map(message =>
                    <Message
                        key={message.id}
                        message={message}
                        deleteMessage={this.deleteMessage.bind(this)}
                    />
                )}
            </div>
        );
    }
}

export default Messages;
