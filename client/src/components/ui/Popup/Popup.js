import React from 'react';
import * as classes from './Popup.module.scss';
import UploadPicture from 'components/ui/UploadImage.js'

class Popup extends React.Component {
  render()  {
    return (
      <div className={classes.Wrapper}>
        <div className={classes.Popup} onClick={e => e.stopPropagation()}>
          <UploadPicture {...this.props} />
        </div>
      </div>
    );
  }
}

export default Popup;