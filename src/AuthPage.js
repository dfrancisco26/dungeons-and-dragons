import React from 'react';
import { signIn, signUp } from './services/fetch-utils';
import { useState } from 'react';

export default function Auth({ setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
      
  async function handleSubmit(e) {
      
    e.preventDefault();
      
    const user = await signUp(email, password);
      
    setUser(user);
  }
      
      
  async function handleLoginSubmit(e) {
      
    e.preventDefault();
      
    const user = await signIn(loginEmail, loginPassword);
      
    setUser(user);
  }
      
  return (
    <div className='auth'>
      <form className='login-form' onSubmit={handleLoginSubmit}>
        <label>Email: <input onChange={e => setLoginEmail(e.target.value)} value={loginEmail} type='email'></input></label>
        <label>Password: <input onChange={e => setLoginPassword(e.target.value)} value={loginPassword} type='password'></input></label>
        <button>Log In</button>
      </form>
      <br></br>
      <hr></hr>
      <br></br>
      <label>Not a user already?
        <form onSubmit={handleSubmit} className='signup-form'>
          <label>Email<input onChange={e => setEmail(e.target.value)} value={email} type='email'></input></label>
          <label>Password<input onChange={e => setPassword(e.target.value)} value={password} type='password'></input></label>
          <button>Sign Up</button>
        </form>
      </label>
    </div>
  );
}