import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
    const isLogin = useSelector((store) => store.user.isLogin)
    const userInfo = useSelector((store => store.user.userInfo))
    return (
        <div id='header'>
            {isLogin ? <div>{userInfo.name}, {userInfo.age}</div> : <div>Welcome to My Login/Register App</div>}
        </div>
    );
}

export default Header;
