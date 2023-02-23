import { updatePost, deletePost } from '../utils/mainPostFuncs'
import Model from './Model'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { ADD_COMMENT, ALL_COMMENTS, EDIT } from '../utils/constants'
import { rerender } from '../utils/postSlice'
import { NoPhoto } from '../utils/icons'
import AccordionSection from '../utils/AccordionSection'

export default function Post({title, date, username, imageSrc, likes, dislikes, id}) {
    const {user} = useSelector(store => store.account)
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState({
        isDisabledLikes: likes.some(el => el === user),
        isDisabledDislikes: dislikes.some(el => el === user),
        likes,
        dislikes
    })

    const handleLike = () => {
        let updatedDislikesArr = feedback.dislikes.filter(el => el !== user)
        let updatedLikesArr = [...feedback.likes, user]
        updatePost(id, {dislikes: updatedDislikesArr, likes: updatedLikesArr})
        setFeedback({
            isDisabledDislikes: false,
            isDisabledLikes: true,
            likes: updatedLikesArr,
            dislikes: updatedDislikesArr
        })
    }

    const handleDislike = () => {
        let updatedDislikesArr = [...feedback.dislikes, user]
        let updatedLikesArr = feedback.likes.filter(el => el !== user)
        updatePost(id, {dislikes: updatedDislikesArr, likes: updatedLikesArr})
        setFeedback({
            isDisabledLikes: false,
            isDisabledDislikes: true,
            likes: updatedLikesArr,
            dislikes: updatedDislikesArr
        })
    }

    return (
        <div className='col posts_post'>
            <div className='post_comments'>
                <Model type={EDIT} disabled={username !== user && true} postId={id}/>
                <button
                    className={username !== user ? 'disabled-button disabled_del' : 'bg-danger custom-button btn_delete'}
                    onClick={() => {
                        dispatch(deletePost(id))
                        dispatch(rerender())
                    }}
                    disabled={username !== user}
                >
                </button>
            </div>
            <h2 className='post_title'>{title}</h2>
            <h2 className='post_date'>Date: {new Date(+date).toString().slice(0, 24)}</h2>
            <div className="post_author">Author: {username}</div>
            <div className='post-imagebox'>
                {imageSrc
                    ?
                    <img className='imagebox-img' alt="post_photo" src={imageSrc}/>
                    :
                    <NoPhoto/>
                }
            </div>
            <div className='d-flex my-4 gap-3 box_likes'>
                <button
                    className={feedback.isDisabledLikes ? 'disabled-button btn_like disabled' : `custom-button bg-success btn_like`}
                    disabled={feedback.isDisabledLikes}
                    onClick={handleLike}
                >
                </button>
                <button
                    className={feedback.isDisabledDislikes ? 'disabled-button btn_dislike disabled' : `custom-button bg-danger btn_dislike`}
                    disabled={feedback.isDisabledDislikes}
                    onClick={handleDislike}
                >
                </button>
            </div>
            <AccordionSection {...feedback}/>
            <div className='post_comments'>
                <Model type={ADD_COMMENT} postId={id}/>
                <Model type={ALL_COMMENTS} postId={id}/>
            </div>
        </div>
    )
}
