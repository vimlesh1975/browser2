import useContextMenu from './useContextMenu'
import './ContextMenu.css';
import axios from 'axios';
import { getToken } from './constants';
import { useDispatch, useSelector } from 'react-redux'

const ContextMenu = () => {

  const { xPos, yPos, showMenu } = useContextMenu();
  window.showMenu = showMenu;
  const activeMediaId = useSelector(state => state.video.activeMediaId);
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.userReducer.user)

  const updateMediaNature = (val) => {
    const payload1 = { MediaID: activeMediaId, MediaNature: val };
    dispatch({ type: 'UPDATE_MEDIA_NATURE', payload: payload1 })
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    axios
      .put(`${backEnd}/updateMediaNature`, payload1, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        // alert(response.statusText)
      })
      .catch(error => {
        alert(error)
      })
  }

  const updateTCOK = (val) => {
    const payload1 = { MediaID: activeMediaId, TechnicalCheckStatus: val, TechnicalCheckBy: loggedUser.userInfo.UserName };
    dispatch({ type: 'UPDATE_TC_OK', payload: payload1 })
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    axios
      .put(`${backEnd}/updateTCOK`, payload1, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        // alert(response.statusText)
      })
      .catch(error => {
        alert(error)
      })
  }

  const updateContentOK = (val) => {
    const payload1 = { MediaID: activeMediaId, ContentVerifyStatus: val, ContentVerifiedBy: loggedUser.userInfo.UserName };
    dispatch({ type: 'UPDATE_CONTENT_OK', payload: payload1 })
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    axios
      .put(`${backEnd}/updateContentOK`, payload1, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        // alert(response.statusText)
      })
      .catch(error => {
        alert(error)
      })
  }
  
  const updateFavourite = (val) => {
    const payload1 = { MediaID: activeMediaId, Favourite: val};
    dispatch({ type: 'UPDATE_FAVOURITE', payload: payload1 })
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    axios
      .put(`${backEnd}/updateFavourite`, payload1, {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        // alert(response.statusText)
      })
      .catch(error => {
        alert(error)
      })
  }
  


  return (<div>
    {showMenu ? (<div className='rightClickMenu' style={{ position: 'absolute', left: xPos, top: yPos, color: 'white' }}>
      <ul>

        <li>set Media Nature<ul >
          <li onClick={() => updateMediaNature('ROW')}>ROW</li>
          <li onClick={() => updateMediaNature('FINISHED')}>FINISHED</li>
        </ul>
        </li>
        <li>set TC<ul >
          <li onClick={() => updateTCOK(1)}>OK</li>
          <li onClick={() => updateTCOK(0)}>Not OK</li>
        </ul>
        </li>
        <li>set Content OK<ul >
          <li onClick={() => updateContentOK(1)}>OK</li>
          <li onClick={() => updateContentOK(0)}>Not OK</li>
        </ul>
        </li>
        <li>set Favourite<ul >
          <li onClick={() => updateFavourite(1)}>Yes</li>
          <li onClick={() => updateFavourite(0)}>No</li>
        </ul>
        </li>
      </ul>
    </div>) : ''}
  </div>);
};

export default ContextMenu