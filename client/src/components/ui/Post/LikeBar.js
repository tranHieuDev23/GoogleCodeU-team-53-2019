import React from 'react';
import LikePopup from 'components/ui/Popup/LikePopUp.js';

class LikeBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
  }

  handleClick = (event) => {
    event.stopPropagation();
    if (!this.state.popup)
      this.setState((oldState, newProps) => {
        return { popup: !oldState.popup };
      });
  };

  handleClosePopup = () => {
    console.log('Wrapper');
    if (this.state.popup) {
      this.setState({
        popup: true
      });
    }
  };

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  };

  render() {
    const { likedUserIds } = this.props.post;
    let str = '';
    if (Array.isArray(likedUserIds)) {
      if (likedUserIds.length === 1) {
        str = 'Liked by one person';
      } else if (likedUserIds.length > 1) {
        str = 'Liked by ' + likedUserIds.length + ' peoples';
      }
    }
    let thisClass = 'Post__LikeBar';
    if (str === '') thisClass += '__hidden';
  
    return (
      <div>
        <div className={thisClass} onClick={this.handleClick}>
          {str}
        </div>
        {this.state.popup ? (
          <LikePopup
            handleClose={this.handleClosePopup}
            post={this.props.post}
            state={this.state}
            onChange={this.handleSetState}
          />
        ) : null}
      </div>
    );
  }
}

export default LikeBar;
