import React from 'react';
import LikePopup from 'components/ui/Popup/LikePopUp.js';

class LikeBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: this.props.popup,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
  }

  handleClick = async (event) => {
    event.stopPropagation();
    const { onChangePost, order } = this.props;
    await onChangePost(order, true);
    if (!this.state.popup)  {
      this.setState({popup: true}); 
    }
  };

  handleClosePopup = () => {
    if (this.state.popup) {
      this.setState({
        popup: false,
      });
    }
  };

  handleSetState = (name, newState) => {
    this.setState({ [name]: newState });
  };

  render() {
    const { numberOfLike } = this.props;
    let str = '';
    if (numberOfLike === 1) {
      str = 'Liked by one person';
    } else if (numberOfLike > 1) {
      str = 'Liked by ' + numberOfLike + ' peoples';
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
