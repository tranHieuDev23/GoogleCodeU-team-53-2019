import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class SinglePicture extends React.Component {
  render() {
    const item = [];
    const { postImages } = this.props.post;

    for (const [index, picture] of postImages.entries()) {
      item.push(
        <div key={index}>
          <img src={picture.imageUrl.value} alt={picture.imageDescription} />
          <p>{picture.imageDescription}</p>
        </div>
      );
    }

    return (
      <Carousel showThumbs={false}>
        {item}
      </Carousel>
    );
  }
}

export default SinglePicture;