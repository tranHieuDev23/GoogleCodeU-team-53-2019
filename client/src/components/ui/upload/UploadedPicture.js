import React from 'react'
import { Button } from 'antd';
import PopupDescription from 'components/ui/upload/PopupDescription';

class UploadedPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      open: false,
      order: null,
    }
  }

  componentDidUpdate = () => {
    const { order, open, description } = this.state;
    const { handleChangeProps } = this.props;
    if (order !== null && open === false) {
      const { imageDescriptions } = this.props;
      const newDescriptions = [...imageDescriptions];
      while (newDescriptions.length < order + 1)
        newDescriptions.push('');
      newDescriptions[order] = description;
      handleChangeProps('imageDescriptions', newDescriptions);
      this.setState({ order: null, description: '' });
    }
  }

  handleChangeDescription = (order) => {
    const { imageDescriptions } = this.props;
    let oldDescription = '';
    if (imageDescriptions.length > order)
      oldDescription = imageDescriptions[order];
    this.setState({ description: oldDescription, open: true, order: order })
  }

  handleDeleteImage = (order) => {
    const { images, handleChangeProps } = this.props;
    const newImages = [...images];
    newImages[order] = null;
    handleChangeProps('images', newImages);
  }

  handleChangeState = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const items = [];
    const { images } = this.props;

    let index = 0;
    images.forEach(file => {
      if (file != null) {
        let url = file && URL.createObjectURL(file);
        const thisKey = index;
        items.push(
          <div className='AddedContainer' key={thisKey}>
            <img
              className='AddedImg'
              src={url}
              alt=''
            />
            <Button
              className='Btn_Edit'
              icon='edit'
              order={index}
              onClick={() => this.handleChangeDescription(thisKey)}
            />
            <Button
              className='Btn_Delete'
              icon='delete'
              onClick={() => this.handleDeleteImage(thisKey)}
            >
            </Button>
          </div>
        );
      }
      ++index;
    });

    const { open, description } = this.state;

    return (
      <React.Fragment>
        {open &&
          <div style={{ display: 'none' }} >
            <PopupDescription
              open={open}
              description={description}
              handleChangeProps={this.handleChangeState}
            />
          </div>
        }
        <div className='AddedWrapper'> {items}</div >
      </React.Fragment>
    );
  }
}

export default UploadedPicture;
