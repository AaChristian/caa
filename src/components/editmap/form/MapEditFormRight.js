import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

class MapEditFormRight extends Component {
    render() {
        //console.log(this.props);
        let map = this.props.map;
        return (
          <div className="map-edit-right-container">
              <div className="map-edit-label">Length</div>
              <div>
                  <input
                      type="text" name="length" className="map-edit-input"
                      value={map.length} onChange={this.props.handleUserInput}/>
              </div>
              <div className="map-edit-label">Difficulty</div>
              <div>
                  <input
                      type="text" name="difficulty" className="map-edit-input"
                      value={map.difficulty} onChange={this.props.handleUserInput}/>
              </div>
              {map.progress === 100 &&
                  <div>
                      <div className="map-edit-label">Release date</div>
                      <div>
                          <DatePicker
                              selected={map.releaseDate !== "NULL" ? moment(map.releaseDate) : moment()}
                              onChange={this.props.handleChangeDate}
                              />
                      </div>
                  </div>
              }
          </div>
        );
    }
}

export default MapEditFormRight;
