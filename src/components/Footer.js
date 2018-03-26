import React, { Component } from 'react';
import { Route } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Laget med React.js</p>
                <Route path="/:path(contact|messages)" render={() =>
                    <div className="external-credit">
                        Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
                    </div>
                } />
            </footer>
        );
    }
}

export default Footer;
