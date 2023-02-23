import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {rerender} from '../utils/postSlice';
import {updatePost, uploadPhoto} from '../utils/mainPostFuncs';

const EditPost = ({postId}) => {
    const [title, setTitle] = useState(' ');
    const photo = useRef(null);
    const dispatch = useDispatch();

    const handleUpdatePost = async () => {
        await updatePost(postId, {title});
        const selectedFile = photo.current.files[0];
        if (selectedFile) {
            await uploadPhoto(postId, selectedFile);
        }
        await dispatch(rerender());
    };

    return (
        <div className='posts_edit-post'>
            <div>
                <input ref={photo} type='file'/>
            </div>
            <input
                className='p-4 border border-1 m-1'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='Change Title'
            />
            <button className='custom-button btn-success' onClick={handleUpdatePost}>
                Update post
            </button>
        </div>
    );
};

export default EditPost;