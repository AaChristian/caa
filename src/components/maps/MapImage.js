import React, { Component } from 'react';

class MapImage extends Component {
    constructor() {
        super();
        this.state = {
            image: []
        }
    }

    componentDidMount() {
        fetch(`/maps/${this.props.mapId}/images-first`)
            .then(res => res.json())
            .then(image => this.setState({image}, () => {
                //console.log(`Images fetched for map ${this.props.mapId}...`, image);
            }))
    }

    render() {
        //console.log("Images: ", this.state.images);
        //console.log(`/maps/${this.props.mapId}/images`);
        //let image = this.state.image[0];
        //console.log(image.location);
        return (
            <div className="Map-image">
                {this.state.image.map(image =>
                    <img
                        key={image.location}
                        src={"media/mapImages/" + image.location}
                        width="300px"
                        height="180px"
                        alt="Bilde her.."
                        data-mapid={this.props.mapId}
                        onClick={this.props.handleLightbox} />
                )}
            </div>
        );
    }
}

export default MapImage;
