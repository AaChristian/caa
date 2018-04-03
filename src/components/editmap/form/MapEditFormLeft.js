import React, { Component } from 'react';
import SelectMapTypes from "./SelectMapTypes";
import SelectGames from "./SelectGames";

class MapEditFormLeft extends Component {
    render() {
        //console.log(this.props);
        let map = this.props.map;
        return (
          <div className="map-edit-left-container">
              <div className="map-edit-label">Navn</div>
              <div className="map-edit-input">
                  <input
                      type="text" name="name" className="map-edit-input"
                      value={map.name} onChange={this.props.handleUserInput}/>
              </div>
              <div className="map-edit-label">Game</div>
              <div className="map-edit-input">
                  <SelectGames currentGame={map.gameId} handleSelectGame={this.props.handleSelectGame} />
                  {/*<input
                      type="text" name="game" className="map-edit-input"
                      value={map.game} onChange={this.props.handleUserInput}/>*/}
              </div>
              <div className="map-edit-label">Type</div>
              <div>
                  <SelectMapTypes currentType={map.type} handleUserInput={this.props.handleUserInput} />
              </div>
          </div>
        );
    }
}

export default MapEditFormLeft;
