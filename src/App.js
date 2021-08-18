import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './Components/Home';
import Loading from './auth0/Loading';
import Profile from './Components/Profile';
import Post from './Components/Post';
import NavBar from './Components/NavBar';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Profile />
        <Switch>
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
