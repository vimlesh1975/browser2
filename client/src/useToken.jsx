import { useState } from 'react';
import { getToken } from './components/constants';

export default function useToken() {
  const [token, setToken] = useState(getToken());

  if (localStorage.getItem('token') !== null) {
    console.log(`token Exists`);
  } else {
    localStorage.setItem('token', '{"token":""}');
    setToken('');
    window.location.href = '/';
  }
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }

}