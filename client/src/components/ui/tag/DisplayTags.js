import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tag } from 'antd';
import { TAG_PAGE } from 'constants/links';
import { isThisPathTagPage } from 'helpers/StringProcess';

const { CheckableTag } = Tag;

class DisplayTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  componentDidUpdate = () => {
    if (this.state.tags !== this.props.tags)
      this.setState({ tags: this.props.tags });
  };

  render() {
    let serverTags = [];
    const { tags } = this.state;
    for (let i = 0; i < tags.length; i++) {
      const item = tags[i];
      serverTags.push(item.tagName);
    }
    const { pathname } = this.props.location;
    return (
      <div>
        <div style={{ marginRight: 8, display: 'inline', color: 'Gray' }}>
          Categories:
        </div>
        {serverTags.map(tag => (
          <React.Fragment>
            {!isThisPathTagPage(pathname) ? (
              <CheckableTag
                key={tag}
                color='geekblue'
                onChange={() => this.props.history.push(TAG_PAGE + '/' + tag)}
                style={{ cursor: 'pointer' }}>
                #{tag}
              </CheckableTag>
            ) : (
              <a href={TAG_PAGE + '/' + tag}>
                <CheckableTag
                  key={tag}
                  color='geekblue'
                  style={{ cursor: 'pointer' }}>
                  #{tag}
                </CheckableTag>
              </a>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default withRouter(DisplayTags);
