import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
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
import UserProfile from './pages/UserProfile'
import GithubUsers from './pages/GithubUsers';
import SwipeProfile from './pages/SwipeProfiles';
import Chat from './pages/Chat';
import Messages from './pages/Messages';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import ChatLogin from './components/ChatLogin';
import RoomList from './components/RoomList';
import CreateRoom from './components/CreateRoom';
import ChatRoom from './components/ChatRoom';

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
  let location = useLocation();
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
            <Route exact path ="/messages" component={Messages} />
            <Route path='/chat'>
              <Chat/>
              <Redirect
                  to={{
                    pathname: "/roomlist",
                    state: { from: location }
                  }}
                />
              </Route>
            <Route path="/chatlogin">
            <ChatLogin />
            </Route>
            <LoggedChatRoute path="/roomlist">
              <RoomList />
            </LoggedChatRoute>
            <LoggedChatRoute path="/createroom">
              <CreateRoom />
            </LoggedChatRoute>
            <LoggedChatRoute path="/chatroom/:room">
              <ChatRoom />
            </LoggedChatRoute>
            <Route component={NoMatch} />
          </Switch>
          <Footer />
      </Router>
    </ApolloProvider>
  );

  function LoggedChatRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('moniker') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/chatlogin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
}

export default App;
