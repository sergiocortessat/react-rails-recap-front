import Home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./auth0/Loading";
import Profile from "./auth0/Profile";
import Post from "./auth0/Post"
import NavBar from "./Components/NavBar"

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
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:id" component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
