import React, { useState } from 'react'
import './Login.css';
const backEnd = process.env.REACT_APP_BACKENDHOST;

async function loginUser(credentials) {
  return fetch(`${backEnd}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export const Login = ({ setToken }) => {

  const [userName, setUserName] = useState();
  const [passWord, setPassword] = useState();
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      userName,
      passWord
    });

    if (token.token === `User not Found`) {
      setLoginSuccess(token.token)
    }
    if (token.token === `UserName/Password didn't match`) {
      setLoginSuccess(token.token)
    }
    else {
      setToken(token);
    }
  }

  return (
    <>
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          Username:  <input required type="text" onChange={e => setUserName(e.target.value)} placeholder="User Email" />
          <br />
          Password:  <input required type="password" autoComplete="on" onChange={e => setPassword(e.target.value)} className="ml-1" placeholder="Password" />
          <div>
            <button className="btn btn-primary" type="submit">Submit</button>
            <br />
            <h1 className="text-danger">{loginSuccess}</h1>
          </div>
        </form>
      </div>


    </>
  )
}

export default Login;
