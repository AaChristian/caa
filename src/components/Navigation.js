import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <ul id="navbar">
				<li><Link to="/">Hjem</Link></li>
				<li><Link to="/maps">Maps</Link></li>
				<li><Link to="/contact">Kontakt</Link></li>
				<li className="dropdown">
					<div className="dropbtn">Testing</div>
					<div className="dropdown-content">
						<Link to="/path1">Link 1</Link>
						<Link to="/path2">Link 2</Link>
						<Link to="/path3">Link 3</Link>
					</div>
				</li>
                <div id="navbar_right">
                    <li><Link to="/messages">Meldinger</Link></li>
                </div>
            </ul>
        );
    }
}

export default Navigation;
