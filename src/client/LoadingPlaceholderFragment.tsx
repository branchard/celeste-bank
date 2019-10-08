import * as React from 'react'
import PhotoGallery from 'react-photo-gallery';
import ContentLoader from 'react-content-loader';
import LoadingPlaceholder from "./LoadingPlaceholder";
import {random} from 'lodash';

class LoadingPlaceholderFragment extends React.Component<Props> {
    render() {
        return (
            <div
                className='loading-placeholder-fragment'
                style={{margin: this.props.margin, height: this.props.photo.height, width: this.props.photo.width}}
            >
                <ContentLoader
                    width={100}
                    height={100}
                    speed={2}
                    interval={.25}
                    primaryColor="#f3f3f3"
                    secondaryColor="#dfdfdf"
                >
                    <rect x="0" y="0" rx="0" ry="0" width={100} height={100}/>
                </ContentLoader>
            </div>
        )
    }
}

interface Props {
    index: any,
    photo: any,
    margin: any,
    left: any,
    top: any
}

export default LoadingPlaceholderFragment
