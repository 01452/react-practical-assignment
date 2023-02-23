import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Posts from './Posts';
import Model from './Model';
import Login from './Login';
import {setLoggedOut} from '../utils/accountSlice';
import {ADD_POST} from '../utils/constants';
import '../css/MainPage.css';

export default function MainPage() {
    const {isLogged, user} = useSelector(state => state.account);
    const dispatch = useDispatch();

    return (<div className='mainPage'>
        {!isLogged ? (<div className='mainPage_login'>
            <Login/>
        </div>) : (<div className='container'>
            <header className='mainPage_header'>
                <h1 className='font-monospace'>NickName: {user}</h1>
                <button
                    className='custom-button btn-danger h-50'
                    onClick={() => dispatch(setLoggedOut())}
                >
                    LogOut
                </button>
            </header>
            <div className='mainPage_modal'>
                <Model type={ADD_POST}/>
            </div>
            <Posts/>
        </div>)}
    </div>);
}