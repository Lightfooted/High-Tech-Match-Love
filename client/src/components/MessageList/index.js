import React, { useState, useEffect, useRef } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_MESSAGES_WITH_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';
import ScrollButton from '../ScrollToTop'


const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView(false));
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
            setMessages(t);
            setNewMessage('');
        } catch (e) {
            alert(`error while saving user: ${e}`);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <div style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}> */}
            <div>
                <ul className="message-text">
                    {messages && messages.map(message => (
                        <li>
                            <p>
                                <span className="message-author">{message.author.firstName} {message.author.lastName}</span>
                                <span className="message-created-at"> {message.createdAt}</span>
                            </p>
                            <p className key={message._id}>
                                {message.text}
                            </p>
                        </li>
                    ))}

                </ul>
                <form className="message-form" onSubmit={handleFormSubmit} style={{ marginBottom: 40 }}>
                    <label>
                        Send a new message: <input type="text" name="text" value={newMessage} style={{ width: 400 }} onChange={handleFormChange} />
                    </label>
                    <input className="message-submit" type="submit" value="Submit" />
                </form>
                <AlwaysScrollToBottom />
                <ScrollButton />
            </div>
        </>
    );
};

export default MessageList;
