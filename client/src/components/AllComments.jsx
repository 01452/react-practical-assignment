import React from 'react';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { updateComment } from '../utils/mainPostFuncs';

export default function AllComments({ postId }) {
    const post = useSelector(store => store.post.posts.find(el => el.id === postId));

    const commentsCount = post.comments.length;
    const commentsList = commentsCount === 0
        ? <div>NO COMMENTS</div>
        : (
            <div className='comment_list_container'>
                <ul className='comment_list'>
                    <p>Total comments: {commentsCount}</p>
                    {post.comments.map((el, index) => {
                        const handleLike = () => {
                            const updatedLikes = el.likes.concat(el.username);
                            const updatedComment = { ...el, likes: updatedLikes };
                            updateComment(el.id, updatedComment);
                        };

                        const handleDislike = () => {
                            const updatedDislikes = el.dislikes.concat(el.username);
                            const updatedComment = { ...el, dislikes: updatedDislikes };
                            updateComment(el.id, updatedComment);
                        };

                        return <Comment key={index} {...el} onLike={handleLike} onDislike={handleDislike} />;
                    })}
                </ul>
            </div>
        );

    return commentsList;
}
