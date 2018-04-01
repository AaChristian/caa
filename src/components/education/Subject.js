import React, { Component } from 'react';

class Education extends Component {
    render() {
        let subject = this.props.subject;
        return (
            <div className="subject-container">
                <h4>{subject.name}</h4>
                <div className="subject-info">
                    {subject.info}
                </div>
            </div>
        );
    }
}

export default Education;
