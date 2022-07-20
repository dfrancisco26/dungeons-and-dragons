import './App.css';
import Auth from './AuthPage';
import { useState } from 'react';
import CreateCharacter from './CreateCharacter';
import Profile from './Profile';
import { client } from './services/client';
import Detail from './Detail';
import { logout } from './services/fetch-utils';
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
          <nav>
            <span id='profile-link'><Link to ="/Profile">Profile</Link></span>
            <span id='charcreate-link'></span><Link to = "/CreateCharacter">Create a new character</Link>
            {user && 
          <button id='logout-button' onClick={handleLogoutClick}>Logout</button>}
          </nav>
        </div>
        <img className='die' src='https://clipart.world/wp-content/uploads/2021/05/D20-clipart-transparent-png-4.png' alt='die'></img>
        <Switch>
          <Route exact path="/">
            {
              !user ? <Auth setUser={setUser} /> : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/CreateCharacter">
            {
              user ? <CreateCharacter /> : <Redirect to="/" />
            }
          </Route>
          <Route exact path="/Profile">
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
