import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

// We do not have to use the default css. Create a new styles.css file. Keep in mind though that all classes are prefixed as rcw-
import 'react-chat-widget/lib/styles.css';
import UPIC from '../assets/genericuser.png';

function Chat() {

  const { data } = useQuery(QUERY_USER);

  useEffect(() => {
    addResponseMessage('Welcome back!');
  }, []);

  const handleNewUserMessage = () => {
  };

  const user = data?.user || {};

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          titleAvatar={UPIC}
          title={user.firstName}
          subtitle='HTML Chat'
        />
      </div>
    );
}

export default Chat;