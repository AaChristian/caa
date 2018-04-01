import React, { Component } from 'react';
import Subject from "./education/Subject";

class Education extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [{
                name: "Object Oriented Programming",
                info: "Java"
            }, {
                name: "Algorithms and Datastructures",
                info: "",
            }, {
                name: "Digital Design and Computer Architecture",
                info: "",
            }, {
                name: "Operating and Database Systems",
                info: "",
            }, {
                name: "Computer Networking adn Datacommunication",
                info: "",
            }, {
                name: "Optimization",
                info: "",
            }, {
                name: "Penetrationtesting",
                info: "",
            }, {
                name: "System Engineering",
                info: "",
            }]
        };
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="education-container">
                <h2>Education</h2>
                <p>Below are some of the subjects I have studied.</p>
                {this.state.subjects.map(subject =>
                    <Subject subject={subject}/>
                )}
            </div>
        );
    }
}

export default Education;
