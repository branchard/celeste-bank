import * as React from 'react'
import PhotoGallery from 'react-photo-gallery';
import {random} from 'lodash';
import LoadingPlaceholderFragment from "./LoadingPlaceholderFragment";

class LoadingPlaceholder extends React.Component<Props> {
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }

    render() {
        return (
            <div
                className='loading-placeholder'
            >
                <PhotoGallery
                    photos={Array.apply(null, Array(this.props.itemsNumber)).map(() => ({
                        src: '',
                        width: random(800, 1900, false),
                        height: random(800, 1900, false),
                    }))}
                    margin={10}
                    targetRowHeight={180}
                    renderImage={({index, left, top, photo}) => (
                        <LoadingPlaceholderFragment key={index} margin={"10px"} index={index} left={left} top={top} photo={photo}/>
                    )}
                />
            </div>
        )
    }
}

interface Props {
    itemsNumber: number
}

export default LoadingPlaceholder

//
// const LoadingPlaceholder = ({index, photo, margin}: any) => {
//     return (
//         <div
//             className='loading-placeholder'
//             style={{margin, height: photo.height, width: photo.width}}
//         >
//             <ContentLoader
//                 width={100}
//                 height={100}
//                 speed={2}
//                 interval={.25}
//                 primaryColor="#f3f3f3"
//                 secondaryColor="#dfdfdf"
//             >
//                 <rect x="0" y="0" rx="0" ry="0" width={100} height={100}/>
//             </ContentLoader>
//         </div>
//     );
// };
//
// export default LoadingPlaceholder;
