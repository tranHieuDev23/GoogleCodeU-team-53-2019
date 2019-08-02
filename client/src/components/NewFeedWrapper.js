import React from 'react';
import { Button } from 'antd';
import NewsFeed from 'components/ui/NewsFeed';
import NoMoreContents from 'components/Result/NoMoreContents';

class NewFeedWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMorePost: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const morePost = await this.props.handleLoadMorePost();
    this.setState({ hasMorePost: morePost });
    this.setState({ loading: false });
  };

  render() {
    const { userStatus, posts } = this.props;
    const { hasMorePost } = this.state;

    return (
      <React.Fragment>
        {posts.length > 0 ? (
          <div>
            <NewsFeed userStatus={userStatus} posts={posts} />
            {hasMorePost ? (
              <div className='LoadMorePost'>
                <Button
                  type='primary'
                  loading={this.state.loading}
                  size='large'
                  onClick={this.handleClick}>
                  Load more post
                </Button>
              </div>
            ) : (
                <NoMoreContents />
              )}
          </div>
        ) : (
            <div />
          )}
      </React.Fragment>
    );
  }
}

export default NewFeedWrapper;
