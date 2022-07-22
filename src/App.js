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
          <span id='profile-link'><Link to ="/profile">Profile</Link></span>
          <span id='charcreate-link'></span><Link to = "/createcharacter">Create a new character</Link>
          
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