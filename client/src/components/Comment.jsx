import { useDispatch, useSelector } from 'react-redux'
import { rerender } from '../utils/postSlice'
import { deleteComment, updateComment } from '../utils/mainPostFuncs'

export default function Comment({ id, text, username, likes, dislikes }) {
    const { user } = useSelector(store => store.account)
    const dispatch = useDispatch()

    const handleEdit = () => {
        updateComment(id, { text: prompt('New text'), likes, dislikes })
        dispatch(rerender())
    }

    const handleDelete = () => {
        dispatch(deleteComment(id))
        dispatch(rerender())
    }

    const handleLike = () => {
        const updatedComment = {
            id,
            text,
            username,
            likes: [...likes, user],
            dislikes: dislikes.filter(disliker => disliker !== user)
        }
        updateComment(id, updatedComment)
        dispatch(rerender())
    }

    const handleDislike = () => {
        const updatedComment = {
            id,
            text,
            username,
            likes: likes.filter(liker => liker !== user),
            dislikes: [...dislikes, user]
        }
        updateComment(id, updatedComment)
        dispatch(rerender())
    }

    const isLiked = likes.includes(user)
    const isDisliked = dislikes.includes(user)

    return (
        <li className='comment_item'>
            <div className='d-flex'>
                <p className='fw-bold pe-3'>{username}: </p>
                <p>{text}</p>
            </div>

            <div className='comment_item_actions'>
                {isLiked ? (
                    <button className='custom-button bg-success' onClick={handleLike}>
                        &#x1F44D; {likes.length}
                    </button>
                ) : (
                    <button className='custom-button' onClick={handleLike}>
                        &#x1F44D; {likes.length}
                    </button>
                )}

                {isDisliked ? (
                    <button className='custom-button bg-danger' onClick={handleDislike}>
                        &#x1F44E; {dislikes.length}
                    </button>
                ) : (
                    <button className='custom-button' onClick={handleDislike}>
                        &#x1F44E; {dislikes.length}
                    </button>
                )}
            </div>

            {username === user && (
                <div className='comment_item_edit'>
                    <button className='custom-button bg-warning' onClick={handleEdit}>
                        EDIT
                    </button>
                    <button className='custom-button bg-danger' onClick={handleDelete}>
                        DELETE
                    </button>
                </div>
            )}
        </li>
    )
}
