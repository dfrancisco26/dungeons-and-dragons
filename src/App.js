import './App.css';
import Auth from './AuthPage';
import { useState } from 'react';
import CreateCharacter from './CreateCharacter';
import Profile from './Profile';
import { client } from './services/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { logout } from './services/fetch-utils';

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
            <ul>
              <li>
                <Link to ="/">Home</Link>
              </li>
              <li>
                <Link to = "/CreateCharacter">Create a new character</Link>
              </li>
              {user && 
          <button onClick={handleLogoutClick}>Logout</button>}
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/">
            {
              user ? <Redirect to="/Profile" /> : <Auth setUser={setUser} />
            }
          </Route>
          <Route exact path="/CreateCharacter" />
          {
            !user ? <Auth setUser={setUser} /> : <Redirect to="/CreateCharacter" />
          }
          <br></br>
          <hr></hr>
          <CreateCharacter />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
