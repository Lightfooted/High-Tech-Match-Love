import React, { useState, useEffect, useRef } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_MESSAGES_WITH_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};



const MessageList = ({ selectedUserId }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [addMessage] = useMutation(ADD_MESSAGE);


    const { loading/*, error */ } = useQuery(QUERY_MESSAGES_WITH_USER, {
        variables: { userId: selectedUserId },
        fetchPolicy: 'no-cache',
        onCompleted: data => setMessages(data.messagesWithUser),
        onError: err => { console.log(`messagesWithUser error: ${err}`) }
    });

    async function handleFormChange(e) {
        setNewMessage(e.target.value);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            console.log(`handleFormSubmit newMessage: ${newMessage}, selectedUserId: ${selectedUserId}`);
            const mutationResponse = await addMessage({
                variables: {
                    text: newMessage,
                    recipient: selectedUserId
                },
            });
            let t = [...messages, mutationResponse.data.addMessage];
            console.log(mutationResponse.data.addMessage);
            console.log(t);
            setMessages(t);

        } catch (e) {
            alert(`error while saving user: ${e}`);
        }
    }

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
                            <span style={{ color: "blue" }}> from {message.author.firstName} {message.author.lastName}</span>
                            <span style={{ color: "orange" }}> at {message.createdAt}</span>
                        </p>
                    ))}
                    <AlwaysScrollToBottom />

                </ul>
                <h3>Send a new message:</h3>
                <form onSubmit={handleFormSubmit} style={{ marginBottom: 40 }}>
                    <label>
                        The Message To Send:
                        <input type="text" name="text" value={newMessage} onChange={handleFormChange} />
                    </label>
                    <input type="submit" value="Submit" style={{ marginTop: 10 }} />
                </form>
            </div>
        </>
    );
};

export default MessageList;
