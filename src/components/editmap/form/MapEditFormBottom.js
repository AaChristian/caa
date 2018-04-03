import React, { Component } from 'react';

class MapEditFormRight extends Component {
    render() {
        //console.log(this.props);
        let map = this.props.map;
        return (
          <div className="map-edit-bottom-container">
              <div className="map-edit-label">Progress ({map.progress + "%"})</div>
              <div>
                  <input
                      type="range" name="progress" className="map-edit-progress"
                      min="0" max="100" value={map.progress}
                      disabled={map.status.toLowerCase() === "released" ? true : false}
                      onChange={this.props.handleUserInput} />
              </div>
              <div className="map-edit-label">Description</div>
                  <textarea
                      name="description" value={map.description}
                      onChange={this.props.handleUserInput}/>
              <div>
                  <input
                      type="submit" name="submit" className="map-edit-submit"
                      value="Submit" onClick={this.props.handleSubmitChanges}/>
                  <button
                      className="contact-test--btn"
                      onClick={this.props.handleResetForm}
                      >Reset
                  </button>
              </div>
              <div className="clear-fix"></div>
          </div>
        );
    }
}

export default MapEditFormRight;
