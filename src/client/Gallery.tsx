import * as React from 'react'
import PhotoGallery from 'react-photo-gallery';
import ContentLoader from 'react-content-loader';
import LoadingPlaceholder from "./LoadingPlaceholder";
import {random} from 'lodash';

const ITEMS_PER_PAGE = 20;

class Gallery extends React.Component<Props> {
    render() {
        return (
            <div className='gallery-container'>
                {/*<PhotoGallery*/}
                    {/*photos={[1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,].map(item => ({*/}
                        {/*src: 'lol',*/}
                        {/*width: random(800, 1900, false),*/}
                        {/*height: random(800, 1900, false),*/}
                    {/*}))}*/}
                    {/*margin={10}*/}
                    {/*targetRowHeight={180}*/}
                    {/*renderImage={({index, left, top, photo}) => (*/}
                        {/*<LoadingPlaceholder key={index} margin={"10px"} index={index} left={left} top={top} photo={photo}/>*/}
                    {/*)}*/}
                {/*/>*/}
                <LoadingPlaceholder itemsNumber={ITEMS_PER_PAGE}/>
            </div>
        )
    }
}

interface Props {
}

export default Gallery
