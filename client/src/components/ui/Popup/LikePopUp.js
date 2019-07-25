import React from 'react';
import * as classes from './LikePopup.module.scss';
import ListUserById from 'components/ui/user/ListUserById.js';

class LikePopup extends React.Component {
  render() {
    return (
      <div className={classes.Wrapper}>
        <div className={classes.Popup} onClick={e => e.stopPropagation()}>
          <div className='center'>Likes</div>
          <ListUserById ids={this.props.post.likedUserIds} />
          <div className='center'>
            <button
              className='btn btn-danger'
              onClick={() => {
                this.props.onChange('popup', false);
              }}>
              {' '}
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LikePopup;
