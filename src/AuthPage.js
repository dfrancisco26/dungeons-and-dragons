import React from 'react';
import { signIn, signUp } from './services/fetch-utils';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Auth({ setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { push } = useHistory();

  async function handleSubmit(e) {
      
    e.preventDefault();
      
    const user = await signUp(email, password);
      
    setUser(user);
    push('Profile');

  }
      
      
  async function handleLoginSubmit(e) {
      
    e.preventDefault();
      
    const user = await signIn(loginEmail, loginPassword);
      
    setUser(user);
    push('Profile');
  }
      
  return (
    <div className='auth'>
      <form className='login-form' onSubmit={handleLoginSubmit}>
        <label>Email: <input onChange={e => setLoginEmail(e.target.value)} value={loginEmail} type='email'></input></label>
        <label>Password: <input onChange={e => setLoginPassword(e.target.value)} value={loginPassword} type='password'></input></label>
        <button>Log In</button>
      </form>
      {/* <br> tags should be avoided--do this work in your CSS */}
      {/* I'm seeing a lot of <input></input>, <hr></hr>, etc where I should be seeing <input />, <hr/>, etc. Notice when you are using a self-closing tag. No html should ever have a tag with no-children. If a tag has no children, make it self-closing. */}
      <hr/>
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