import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <ul id="navbar">
				<li><Link to="/">Hjem</Link></li>
				<li><Link to="/router">Route test</Link></li>
				<li><Link to="/maps">Maps</Link></li>
				<li><Link to="/contact">Kontakt</Link></li>
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
