import React from 'react'
import * as classes from 'css/Picture.scss'

class AddedPicture extends React.Component  {
  render()  {
    const items = [];
    const { images } = this.props;

    for(const [index, image] of images.entries()) {
      let file = image.selectedFile;
      
      if (file != null) {
        let url = file && URL.createObjectURL(file);
        items.push(<img src={url} className={classes.img} alt={image.imageDescription} key={index*2-1}/>);
        items.push(<p key={index*2}>{image.imageDescription}</p>)
      }
      
    }
    return  (
      <div className={classes.Wrapper}>
        {items}
      </div>
    );
  }
}

export default AddedPicture;