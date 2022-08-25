/* 
Your component file structure and component tree are clean and managable, and your code works without bugs, so great work! There are some maintainability issues related to naming and repitition throughout your code, but generally speaking I'd find it a pleasure to work in this codebase if I were assigned to maintain it in the future. I would have liked to see you hit more stretch goals and add some more ambitious features, but this is a great foundation for a more complex app later on. I look forward to see what y'all do in the future after a few mon.

One note: Please be more conscious of your naming decisions in branches. I initially gave feedback on your main branch before i noticed there were 4 other branches: Dav, DavR, devDs and spm. I'm assuming DavR is the one you want me to grade since it has the most recent commits, but how in the world would anybody know that looking at these names? 
*/

import './App.css';
import Auth from './AuthPage';
import { useState } from 'react';
import CreateCharacter from './CreateCharacter';
import Profile from './Profile';
import { client } from './services/client';
import Detail from './Detail';
import { logout } from './services/fetch-utils';
import logo from './assets/die.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';


function App() {
  const [user, setUser] = useState(client.auth.user());

  async function handleLogoutClick() {
    await logout();
    setUser('');

  }

  return (
    <div className="App">
      <Router>
        <div className='navigation'>
          <Link id='profile-link' to ="/profile">Profile</Link>
          <Link id='create-link' to = "/createcharacter">Create a new character</Link>
          
          {user && 
          <button id='logout-button' onClick={handleLogoutClick}>Logout</button>}
        </div>
        <img className='die' src={logo} alt='die'></img>
        <Switch>
          <Route exact path="/">
            {
              !user ? <Auth setUser={setUser} /> : <Redirect to="/profile" />
            }
          </Route>
          <Route exact path="/createcharacter">
            {
              user ? <CreateCharacter /> : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/profile">
            {
              user ? <Profile /> : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/detail/:id">  
            {
              user ? <Detail/> : <Redirect to="/" />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;