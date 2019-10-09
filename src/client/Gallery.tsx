import * as React from 'react'
import PhotoGallery from 'react-photo-gallery';
import ContentLoader from 'react-content-loader';
import LoadingPlaceholder from "./LoadingPlaceholder";
import {random} from 'lodash';
import {connect} from "react-redux";

const ITEMS_PER_PAGE = 20;

class Gallery extends React.Component<Props> {
    static mapStateToProps = (state: any) => ({
        pendingSearch: state.core.pendingSearch,
        photos: state.core.photos,
    });

    render() {
        return (
            <div className='gallery-container'>
                <PhotoGallery
                    photos={this.props.photos.filter((photo: any) => photo.width_o || photo.o_width).map((photo: any) => ({
                        src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                        width: photo.width_o || photo.o_width,
                        height:  photo.height_o || photo.o_height,
                    }))}
                    margin={10}
                    targetRowHeight={180}
                    // renderImage={({index, left, top, photo}) => (
                    //     <LoadingPlaceholder key={index} margin={"10px"} index={index} left={left} top={top} photo={photo}/>
                    // )}
                />
                { this.props.pendingSearch ? (
                    <LoadingPlaceholder itemsNumber={ITEMS_PER_PAGE}/>
                ) : undefined }
            </div>
        )
    }
}

interface Props {
    pendingSearch: boolean
    photos: []
}

export default connect(Gallery.mapStateToProps)(Gallery);
