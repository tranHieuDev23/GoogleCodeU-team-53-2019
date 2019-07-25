import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Gallery from 'react-grid-gallery';

class SinglePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postImages: [],
      items: []
    }
    this.applyPostImages = this.applyPostImages.bind(this);
    this.applyPostImages(this.props.post.postImages);
  }

  componentDidUpdate() {
    const { postImages } = this.props.post;
    if (!postImagesChanged(this.state.postImages, postImages))
      return;
    this.applyPostImages(postImages);
  }

  applyPostImages(postImages) {
    this.setState({
      postImages: postImages,
      items: []
    });
    if (postImages === null)
      return;
    const promises = [];
    for (const [, picture] of postImages.entries())
      promises.push(getImageItem(picture.imageUrl.value, picture.imageDescription));
    Promise.all(promises).then((results) => {
      this.setState({
        items: results
      });
    });
  }

  render() {
    const galleryStyle = {
      marginLeft: 'auto',
      marginRight: 'auto'
    };
    return (
      <React.Fragment>
        {this.state == null ? (
          <div />
        ) : (
          <Gallery
            style={galleryStyle}
            images={this.state.items}
            rowHeight={240}
            enableLightbox={true}
            enableImageSelection={false}
          />
        )}
      </React.Fragment>
    );
  }
}

function getImageItem(imageSrc, imageDescription) {
  return new Promise(resolve => {
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
    };
    img.src = imageSrc;
  });
}

function postImagesChanged(oldImages, newImages) {
  if (oldImages == null)
    return newImages != null;
  if (newImages == null)
    return true;
  if (oldImages.length !== newImages.length) 
    return true;
  for (let i = 0; i < oldImages.length; i ++) {  
    let oldImage = oldImages[i];
    let newImage = newImages[i];
    if (oldImage.id !== newImage.id)
      return true;
  };
  return false;
}

export default SinglePicture;
