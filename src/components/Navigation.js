import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <ul id="navbar">
				<li><a href="#">Info</a></li>
				<li><a href="#">Brukere</a></li>
				<li><a href="#">Legg til bruker</a></li>
				<li><a href="#">Planlegg</a></li>
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Testing</a>
					<div className="dropdown-content">
						<a href="#">Link</a>
						<a href="#">Link 2</a>
						<a href="#">Link 3</a>
					</div>
				</li>
            </ul>
        );
    }
}

export default Navigation;
