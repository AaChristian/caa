import React, { Component } from 'react';

class ManageMessage extends Component {
    constructor() {
        super();
        this.state = {
            imgSrc: "dustbin.svg"
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseOver() {
        this.setState({
            imgSrc: "dustbin-red.svg"
        });
    }

    handleMouseLeave() {
        this.setState({
            imgSrc: "dustbin.svg"
        });
    }

    handleClick() {
        console.log("Clicked..");
        console.log(`/contactMessages/${this.props.id}`);
        /*fetch(`/contactMessages/${this.props.id}`, {
            method: "DELETE"
        })*/
        console.log(this.props.id);
    }

    render() {
        return (
            <div className="manage-message">
                <img
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                    src={"media/icons/"+ this.state.imgSrc}
                    alt="delete"
                    id={this.props.id}
                    onClick={this.props.deleteMessage}
                />
            </div>
        );
    }
}

export default ManageMessage;
