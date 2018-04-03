import React, { Component } from 'react';

class SelectGames extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            selectedGameId: ""
        }
        //this.handleSelectGame = this.handleSelectGame.bind(this);
    }

    componentDidMount() {
        let currentGame = this.props.currentGame;
        //console.log("selected game: " + selectedGameId);
        fetch("/games")
            .then(res => res.json())
            .then(games => this.setState({
                games
            }, () => {
                console.log("Games fetched..", games);
            }));
        let games = this.state.games;
        for (var i = 0; i < games.length; i++) {
            if (games[i].name == currentGame) {
                console.log(games[i].name);
                break;
            }
        }
    }


    render() {
        //console.log(this.props);
        return (
          <select className="select-game" value={this.props.currentGame} onChange={(e) => this.props.handleSelectGame(e)}>
              {this.state.games.map(game =>
                  <option
                      key={game.id} value={game.id}>
                      {game.name}
                  </option>
              )}
          </select>
        );
    }
}

export default SelectGames;
