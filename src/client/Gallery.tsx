import * as React from 'react'
import PhotoGallery from 'react-photo-gallery';
import ContentLoader from 'react-content-loader';
import LoadingPlaceholder from "./LoadingPlaceholder";
import {random} from 'lodash';
import {connect} from "react-redux";
import {actions} from './store/core';

const ITEMS_PER_PAGE = 20;

class Gallery extends React.Component<Props> {
    private loadingPlaceholderRef?: React.RefObject<HTMLDivElement>;

    static mapStateToProps = (state: any) => ({
        pendingSearch: state.core.pendingSearch,
        photos: state.core.photos,
        currentPage: state.core.currentPage,
        searchValue: state.core.searchValue,
    });

    constructor(props: Readonly<Props>) {
        super(props);
        this.loadingPlaceholderRef = React.createRef();

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener('scroll', this.onScroll, true);
    }

    componentWillUnmount(): void {
        document.removeEventListener('scroll', this.onScroll, true);
    }

    onScroll(event: any) {
        // console.log(this.loadingPlaceholderRef.current);
        // console.log('scroll', window.innerHeight, window.scrollY, document.body.clientHeight, this.loadingPlaceholderRef.current.clientHeight );
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - this.loadingPlaceholderRef.current.clientHeight) {
            console.log('scroll to loader, need to fetch next page');
            if(!this.props.pendingSearch){
                this.props.dispatch(actions.fetchNextPage(this.props.currentPage, this.props.searchValue));
            }
        }
    }

    render() {
        return (
            <div className='gallery-container'>
                {this.props.photos.map((photos: any) => (
                    <PhotoGallery
                        photos={photos.filter((photo: any) => photo.width_o || photo.o_width).map((photo: any) => ({
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
                ))}
                { this.props.pendingSearch || this.props.photos.length > 0 ? (
                    <div ref={this.loadingPlaceholderRef}>
                        <LoadingPlaceholder itemsNumber={ITEMS_PER_PAGE}/>
                    </div>
                ) : undefined }
            </div>
        )
    }
}

interface Props {
    pendingSearch: boolean
    photos: []
    dispatch: any
    currentPage: number
    searchValue: string
}

export default connect(Gallery.mapStateToProps)(Gallery);
