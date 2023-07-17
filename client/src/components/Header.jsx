import React, { useRef } from 'react'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux'

export const Header = () => {
    const user = useSelector(state => state.userReducer.user);
    const bg = useSelector(state => state.bgReducer.bg);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.setItem('token', '{"token":""}');
        window.location.href = 'http://183.82.113.8/pbns/dmam/home/index.php';
    }
    const selectBg = e => {
        dispatch({ type: 'CHANGE_BG', payload: e.target.value })
    }

    const bgColorRef = useRef(null);

    const showAndSelectColor = () => {
        bgColorRef.current.focus();
        // bgColorRef.current.value = bg;
        bgColorRef.current.click();
    }

    return (
        <>
            <input ref={bgColorRef} type="color" value='#7092BE' onChange={e => selectBg(e)} style={{ display: 'none' }}></input>
            <nav onDoubleClick={showAndSelectColor} className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: bg }}>
                <div style={{ width: '100%' }}>
                    <button type="button" className="btn btn-warning btn-sm  mr-1"><a href="http://183.82.113.8/pbns/dmam/home/index.php">HOME</a></button>
                    <div className='float-right'>

                        <span className='mr-2'>{user.userInfo.UserName}</span>

                        <span className='mr-2'>{user.userInfo.ViewCode}</span>
                        <span className='mr-2'>{user.userInfo.FullName}</span>
                        <span className='mr-2'>{user.userInfo.ViewCode.toString().trim().substring(user.userInfo.ViewCode.toString().trim().length - 2, user.userInfo.ViewCode.toString().trim().length - 1)}</span>

                        {/* <button className='btn-danger' onClick={logout}>LogOut   <ExitToAppIcon /> </button> */}
                        <button className='btn-danger' onClick={logout}>LogOut    </button>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header;
