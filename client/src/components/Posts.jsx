import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {filterPosts, loadPosts} from '../utils/mainPostFuncs';
import {debounce} from 'lodash';
import Post from './Post';
import Filter from './Filter';
import '../css/Posts.css';

export default function Posts() {
    const [page, setPage] = useState(1);
    const {isLoading, toFilter, posts, totalPages, rerender} = useSelector((store) => store.post);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toFilter) {
            dispatch(filterPosts(toFilter));
        } else {
            dispatch(loadPosts(page));
        }
    }, [page, rerender, toFilter, dispatch]);

    const createPagination = () => {
        if (toFilter) {
            return null;
        }

        const arr = [];
        for (let i = 0; i < totalPages; i++) {
            arr.push(<li key={i} onClick={() => setPage(i + 1)} className="page-item">
                <button className="page-link">{i + 1}</button>
            </li>);
        }
        return arr;
    };

    return (<>
        {isLoading ? (<div>Loading...</div>) : (<>
            <Filter/>
            <pre className="row row-cols-xl-3 row-cols-md-2 row-cols-1">
            {posts.length === 0 ? (<div className="posts_not-found">No posts found</div>) : (posts.map((el) => <Post
                key={el.id} {...el} />))}
          </pre>
        </>)}
        <ul className="pagination pagination-lg d-flex justify-content-center">
            {createPagination()}
        </ul>
    </>);
}
