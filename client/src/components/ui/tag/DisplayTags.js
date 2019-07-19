import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tag } from 'antd';
import { TAG_PAGE } from 'constants/links';

const { CheckableTag } = Tag;

class DisplayTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    let serverTags = [];
    const { tags } = this.props;
    for(let i = 0; i < tags.length; i++) {
      const item = tags[i];
      serverTags.push(item.tagName);
    }

    return (
      <div>
        <div style={{ marginRight: 8, display: 'inline', color:'Gray'}}>Categories:</div>
        {serverTags.map(tag => (
          <CheckableTag
            key={tag}
            color='geekblue'
            onChange={() => this.props.history.push(TAG_PAGE + '/' + tag)}
            style={{cursor:'pointer'}}
          >
            #{tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default withRouter(DisplayTags);