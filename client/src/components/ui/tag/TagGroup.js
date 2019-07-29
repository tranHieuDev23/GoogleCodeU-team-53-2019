import React from 'react';
import { Tag, Input, Icon, Row, Button } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

class TagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      inputVisible: false,
      inputValue: '',
      sugessting: false,
    };
  }

  componentDidUpdate = () => {
    const { tags } = this.props;
    if (tags !== this.state.tags) {
      this.setState({ tags: tags });
    }
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.onChangeTags(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
    this.props.onChangeTags(tags);
  };

  handlesuggestTag = async () => {
    this.setState({sugessting: true});
    const { getSugesstion } = this.props;
    await getSugesstion();
    this.setState({sugessting: false});
  }

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}>
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <Row type='flex' style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
        <Button
          size='small'
          loading={this.state.sugessting}
          onClick={this.handlesuggestTag}
        >
          Get tag sugesstion
        </Button>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type='plus' /> New Tag
          </Tag>
        )}

        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
            onComplete: e => {
              e.target.style = '';
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}>
          {tagChild}
        </TweenOneGroup>
      </Row>
    );
  }
}

export default TagGroup;
