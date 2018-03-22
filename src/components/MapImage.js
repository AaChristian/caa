import React, { Component } from 'react';
import Lightbox from "./Lightbox";

class MapImage extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
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

    handleClick() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    render() {
        //console.log("Images: ", this.state.images);
        //console.log(`/maps/${this.props.mapId}/images`);
        return (
            <div className="Map-image">
                {this.state.images.map(image =>
                    <img key={image.location} src={"media/" + image.location} width="300px" height="180px" alt="Bilde her.." onClick={this.handleClick.bind(this)} />
                )}
                {this.state.showModal ? <Lightbox /> : null}
            </div>
        );
    }
}

export default MapImage;
