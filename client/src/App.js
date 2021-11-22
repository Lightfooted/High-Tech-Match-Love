import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SelectedUserImage from './components/SelectUserImage';
import Nav from './components/Nav';
import GithubUsers from './pages/GithubUsers';
import Chat from './pages/Chat';
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
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={SelectedUserImage} />
            <Route exact path="/gitusers" component={GithubUsers} />
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
        </div>
      </Router>
    </ApolloProvider>
  );

  function LoggedChatRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('nickname') ? (
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
