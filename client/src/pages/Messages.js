import React, { useState, useEffect, useRef } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_ALL_OTHER_USERS } from '../utils/queries';
import MessageList from '../components/MessageList';
import { useQuery  } from '@apollo/client';

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };


const Messages = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    const { loading /*, error */} = useQuery(QUERY_ALL_OTHER_USERS, {   
        fetchPolicy: 'no-cache',
        // onCompleted: data => console.log(JSON.stringify(data.allOtherUsers)),
        onCompleted: data => { console.log(`calling queryallotherusers again`); setUsers(data.allOtherUsers)},
    });

    const refreshMessages = () => {
        console.log('refreshMessages DOES NOT WORK YET');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}>
                <h3>Users:</h3>

                {users && users.map(user => (
                    <button key={user._id} onClick={() => setSelectedUser(user)}>{user.firstName} {user.lastName}</button>
                ))}
                {selectedUser && (
                    <>
                        <h3>Here are your messages with {selectedUser.firstName} {selectedUser.lastName}</h3>
                        <MessageList
                            selectedUserId={selectedUser._id}
                        />
                        <button onClick={() => refreshMessages()} >Refresh</button>
                    </>
                )}
                <ul>
                <AlwaysScrollToBottom />
                </ul>
            </div>
        </>
    );
};

export default Messages;
