import React from 'react';
import { Button } from 'antd';
import NewsFeed from 'components/ui/NewsFeed';

class NewFeedWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    this.setState({loading: true});
    await this.props.handleLoadMorePost();
    this.setState({loading: false});
  }

  render() {
    const { userStatus, posts } = this.props;
    return (
      <div>
        <NewsFeed
          userStatus={userStatus}
          posts={posts}
        />
        <div className='LoadMorePost'>
          <Button
            type="primary"
            loading={this.state.loading}
            size="large"
            onClick={this.handleClick}
          >
             Load more post
        </Button>
        </div>
      </div >
    );
  }
}

export default NewFeedWrapper;