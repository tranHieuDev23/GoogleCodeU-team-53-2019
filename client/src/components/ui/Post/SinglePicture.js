import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Gallery from "react-grid-gallery";

class SinglePicture extends React.Component {
  constructor(props) {
    super(props);

    const { postImages } = this.props.post;
    const promises = [];
    for (const [index, picture] of postImages.entries())
      promises.push(getImageItem(picture.imageUrl.value, picture.imageDescription));

    Promise.all(promises).then((results) => {
      this.setState({
        items: results
      })
    });
  }

  render() {
    let galleryStyle = {
      marginLeft: 'auto',
      marginRight: 'auto'
    };
    return (
      <React.Fragment>
        {
          (this.state == null) ? <div /> :
            <Gallery
              style={galleryStyle}
              images={this.state.items}
              rowHeight={240}
              enableLightbox={true}
              enableImageSelection={false} />
        }
      </React.Fragment>
    );
  }
}

function getImageItem(imageSrc, imageDescription) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => {
      resolve({
        src: imageSrc,
        thumbnail: imageSrc,
        thumbnailHeight: img.height,
        thumbnailWidth: img.width,
        alt: imageDescription,
        caption: imageDescription
      });
    }
    img.src = imageSrc;
  });
}

export default SinglePicture;