import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_MESSAGES_WITH_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const MessageList = ({ selectedUserId }) => {

    const [messages, setMessages] = useState([]);

    console.log(`MessageList selecteUserId: ${selectedUserId}`);

    const { loading, error } = useQuery(QUERY_MESSAGES_WITH_USER, {
        variables: { userId: selectedUserId },
        fetchPolicy: 'no-cache',
        onCompleted: data => { console.log(`MessageList updated, data: ${data}`); setMessages(data.messagesWithUser) },
        onError: err => { console.log(`Brenda messagesWithUser error: ${err}`)}
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!messages.length) {
        return <div>No Messages!</div>
    }

    return (
        <>
            <div style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}>
                <ul>
                {messages && messages.map(message => (
                    <p key={message._id}>
                        {message.text}
                        <span style={{color:"blue"}}> from {message.author.firstName} { message.author.lastName}</span>
                        <span style={{color:"orange"}}> at { message.createdAt }</span>
                    </p>
                ))}
                </ul>
            </div>
        </>
    );
};

export default MessageList;
