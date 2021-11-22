import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import SelectedUserImage from './components/SelectUserImage';
import UserProfile from './pages/UserProfile'
// import Nav from './components/Nav';
import GithubUsers from './pages/GithubUsers';
import SwipeProfile from './pages/SwipeProfiles';
import Chat from './pages/Chat';
import Messages from './pages/Messages';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/gitusers" component={GithubUsers} />
            <Route exact path="/findmatch" component={SwipeProfile} />
            <Route exact path ="/chat" component={Chat} />
            <Route exact path ="/messages" component={Messages} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
