import React from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import CustomPhoto from './CustomPhoto';

class SinglePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postImages: [],
      items: [],
      viewerIsOpen: false,
      currentImage: 0
    }
    this.applyPostImages = this.applyPostImages.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);

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

  openLightbox(event, { photo, index }) {
    this.setState({
      viewerIsOpen: true,
      currentImage: index
    });
  }

  closeLightbox() {
    this.setState({
      viewerIsOpen: false
    });
  }

  render() {
    const { items, viewerIsOpen, currentImage } = this.state;
    return (
      this.state == null ? (
        null
      ) : (
          <div className="mt-3">
            <Gallery
              photos={items}
              margin={4}
              onClick={this.openLightbox}
              renderImage={CustomPhoto} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={this.closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={items}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        )
    );
  }
}

function getImageItem(imageSrc, imageDescription) {
  return new Promise(resolve => {
    let img = new Image();
    img.onload = () => {
      resolve({
        src: imageSrc,
        source: imageSrc,
        height: img.height,
        width: img.width,
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
  for (let i = 0; i < oldImages.length; i++) {
    let oldImage = oldImages[i];
    let newImage = newImages[i];
    if (oldImage.id !== newImage.id)
      return true;
  };
  return false;
}

export default SinglePicture;
