import './style.css';

import Home from './components/Home';
import MyNotes from './components/MyNotes';
import About from './components/About';
import Contacts from './components/Contacts';
import Extra from './components/Extra';

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,firestore} from './firebase';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
    <>
      <Switch>
        <Route exact path="/">
          {user ? <MyNotes 
              db={firestore} 
              auth={auth} 
              user={user}
            /> 
          : <Home auth={auth}/>}
        </Route>
        <Route exact path="/about">
            <About auth={auth}/>
        </Route>
        <Route exact path="/contacts">
            <Contacts 
              auth={auth}
              db={firestore}
            />
        </Route>
        <Route exact path="/extra">
            <Extra auth={auth}/>
        </Route>
      </Switch>
    </>
    </Router>
    
  );
}

export default App;
