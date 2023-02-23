import { useDispatch } from 'react-redux';
import { setUser } from '../utils/accountSlice';
import '../css/Login.css';
import {useState} from "react";

export default function Login() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSetUser = () => {
        if (name.trim().length !== 0) {
            dispatch(setUser(name));
        }
    };

    return (
        <div className="login">
            <input
                className="login_input"
                placeholder="LOGIN"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="custom-button ms-3" onClick={handleSetUser}>
                LogIn
            </button>
        </div>
    );
}
