import React, { Component } from 'react';

class About extends Component {
    constructor() {
        super();
        this.state = {
            birthday: "1989-12-11",
            age: null
        };
    }

    componentDidMount() {
        let birthday = new Date(this.state.birthday);
        let today = new Date();
        let diff = today - birthday;
        let age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        this.setState({ age: age });
    }

    render() {
        return (
            <div className="Main-component-containter">
                <h2>Om meg</h2>
                <p>Jeg er en {this.state.age} år gammel full stack utvikler som ha alltid har hvert interresert i IT,
                    spesielt programmering og annet kreativt innenfor spill, animasjon og film. Mye av min fritid har
                    gått ut på å utvikle meg innenfor disse feltene.</p>
            </div>
        );
    }
}

export default About;
