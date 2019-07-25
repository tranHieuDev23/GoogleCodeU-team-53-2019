import React from 'react';
import SinglePicture from 'components/ui/Post/SinglePicture';
import PostAuthor from 'components/ui/Post/PostAuthor.js'
import LikeBar from 'components/ui/Post/LikeBar';
import parse from 'html-react-parser';
import InteractiveBar from 'components/ui/Post/InteractiveBar'
import CommentBar from 'components/ui/Post/CommentBar';
import DisplayTags from 'components/ui/tag/DisplayTags'

function PostCard(post) {
    return (
        (post == null)
            ? (<div />)
            : (
                <div className="Post">
                    <PostAuthor {...this.props} />
                    <div className="Post__Description">{parse(post.descriptionText)}</div>
                    <DisplayTags tags={post.tags} />
                    <SinglePicture {...this.props} />
                    <InteractiveBar
                        {...this.props}
                        numberOfLike={this.state.numberOfLike}
                        onChangeLikes={this.onChangeLikes}
                    />
                    <LikeBar
                        {...this.props}
                        numberOfLike={this.state.numberOfLike}
                        onChangeLikes={this.onChangeLikes}
                    />
                    {this.props.withComment &&
                        <CommentBar
                            {...this.props}
                        />
                    }
                </div>
            )
    );
};

export default PostCard;