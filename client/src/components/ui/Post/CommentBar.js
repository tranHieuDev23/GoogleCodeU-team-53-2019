import React from 'react';

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      curIndex: 0,
    }
    this.handleShowMoreComment = this.handleShowMoreComment.bind(this);
  }

  componentDidMount = () => {
    this.loadMoreComment();
  }

  handleShowMoreComment = () => {
    this.loadMoreComment();
  }

  loadMoreComment = () => {
    const { comments } = this.props.post;
    let newItems = this.state.items;
    if (Array.isArray(comments))  {
      const { curIndex } = this.state;
      const lastIndex = Math.min(comments.length, curIndex + 10);
      for(let index = curIndex; index < lastIndex; index++) {
        let comment = comments[index];
        newItems.push(<div className="Post__Comments__Comment" index={index}>
            {comment}
          </div>)
      }
      if (curIndex !== lastIndex)  {
        this.setState({curIndex: comments.length});
        this.setState({items: newItems});
      }
    }
  }

  render() {
    return (
      <div className="Post__Comments">
        {this.state.items}
        <div className="Post__Comments_ShowMore" onClick={this.handleShowMoreComment}>Show more comments</div>
      </div>
    );
  }
}

export default CommentBar;

/*
<div className="Post__Comments">
  <div className="Post__Comments__Comment">
    ABC
  </div>
  <div className="Post__Comments__Comment">
    ABC
  </div>
  <div className="Post__Comments__Comment">
    ABC
  </div>
</div>
*/