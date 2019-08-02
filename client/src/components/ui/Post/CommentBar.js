import React from 'react';
import { Input, notification } from 'antd';
import { CREATE_COMMENT } from 'constants/links.js';
import { addFirstParamToUrl, addParamToUrl } from 'helpers/FetchServer.js';
import axios from 'axios';

const { Search } = Input;

class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    const { comments } = this.props.post;
    let startIndex = 0;
    if (Array.isArray(comments)) startIndex = comments.length;
    this.state = {
      items: [],
      curIndex: startIndex,
      value: '',
      curLength: startIndex
    };
    this.handleShowMoreComment = this.handleShowMoreComment.bind(this);
    this.writeNewComment = this.writeNewComment.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount = () => {
    let numberOfNewComment = 10;
    const { isNewfeed } = this.props;
    if (isNewfeed === true)
      numberOfNewComment = 3;
    this.loadMoreComment(numberOfNewComment);
  };

  componentDidUpdate = () => {
    const { comments } = this.props.post;
    const { curLength } = this.state;
    if (Array.isArray(comments))
      if (curLength !== comments.length) {
        this.setState({ curLength: comments.length });
        this.loadMoreComment(0);
      }
  };

  handleShowMoreComment = () => {
    let numberOfNewComment = 10;
    const { isNewfeed } = this.props;
    if (isNewfeed === true)
      numberOfNewComment = 3;
    this.loadMoreComment(numberOfNewComment);
  };

  handleChangeInput = event => {
    this.setState({ value: event.target.value });
  };

  writeNewComment = async value => {
    const { post } = this.props;
    if (!(value == null || value === '')) {
      let url = CREATE_COMMENT;
      url = addFirstParamToUrl(url, 'postId', post.id);
      url = addParamToUrl(url, 'commentText', value);
      await axios
        .post(url, {})
        .then(async response => {
          const { data } = response;
          if (data.id != null) {
            this.props.onChangePost(1, false);
          }
          this.setState({ value: '' });
          const { onChangePost, order } = this.props;
          await onChangePost(order, true);
        })
        .catch(function (error) {
          notification.error({
            message: 'Can upload comment',
            description: 'Please check your connection and post it again!!!'
          });
        });
    }
  };

  loadMoreComment = numOfComment => {
    const { comments } = this.props.post;
    if (Array.isArray(comments)) {
      let newItems = [];
      const { curIndex } = this.state;
      if (curIndex > 0 || numOfComment === 0) {
        const firstIndex = Math.max(0, curIndex - numOfComment);
        for (let index = firstIndex; index < comments.length; index++) {
          let comment = comments[index];
          newItems.push(
            <div
              className='Post__Comments__Author'
              key={comment.id + '-author'}>
              {comment.author.username}
            </div>
          );
          newItems.push(
            <div
              className='Post__Comments__Comment'
              key={comment.id + '-comment'}>
              {comment.text}
            </div>
          );
          this.setState({ curIndex: firstIndex });
          this.setState({ items: newItems });
        }
      }
    }
  };

  render() {
    const { isLogin } = this.props.userStatus;
    const { isNewfeed } = this.props;
    let canComment = true;
    if (isNewfeed === true)
      canComment = false;
    return (
      <div className='Post__Comments'>
        {this.state.curIndex > 0 && (
          <div
            className='Post__Comments__ShowMore'
            onClick={this.handleShowMoreComment}>
            Show more comments
          </div>
        )}
        {this.state.items}
        {isLogin && canComment && (
          <Search
            placeholder='Enter your comment here!'
            enterButton='Post'
            value={this.state.value}
            onChange={this.handleChangeInput}
            onSearch={this.writeNewComment}
          />
        )}
      </div>
    );
  }
}

export default CommentBar;
