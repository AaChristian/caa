import React, { Component } from 'react';

class MapEditImages extends Component {
    render() {
        return (
            <div className="map-edit-form-images">
                <p>Slette og legge til bilder her (eget skjema) for map id: {this.props.mapId}</p>
                <div className="map-current-images">
                {this.props.images.map(image =>
                    <div key={image.id} className="map-current-single-image">
                        <img
                            key={image.location}
                            src={"media/mapImages/" + image.location}
                            width="300px"
                            height="180px"
                            alt="Bilde her.."
                            data-mapid={this.props.mapId}
                        />
                        <span
                            className="map-edit-image-del cursor"
                            onClick={() => this.props.handleDeleteImage(image.id)}
                            >
                            &times;
                        </span>
                    </div>
                )}
                <div className="clear-fix"></div>
                </div>
                <div>
                    <form onSubmit={this.props.handleFileSubmit} method="post" encType="multipart/form-data">
                        <input type="file" name="mapImage"
                            onChange={(e) => this.props.handleFileSelect(e)}/>
                        <input
                            type="submit" name="submit" className="map-edit-submit"
                            value="Submit" disabled={!this.props.fileValid}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default MapEditImages;
