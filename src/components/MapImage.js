import React, { Component } from 'react';

class MapImage extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        fetch(`/maps/${this.props.mapId}/images`)
            .then(res => res.json())
            .then(images => this.setState({images}, () => {
                console.log(`Images fetched for map ${this.props.mapId}...`, images);
            }))
    }

    render() {
        //console.log("Images: ", this.state.images);
        //console.log(`/maps/${this.props.mapId}/images`);
        return (
            <div className="Map-image">
                {this.state.images.map(image =>
                    <img key={image.location} src={"media/" + image.location} width="300px" height="180px" alt="Bilde her.." />
                )}
            </div>
        );
    }
}

export default MapImage;
