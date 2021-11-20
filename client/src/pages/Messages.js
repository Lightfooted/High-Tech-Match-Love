import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_ALL_OTHER_USERS } from '../utils/queries';
import MessageList from '../components/MessageList';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

const Messages = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { loading, error } = useQuery(QUERY_ALL_OTHER_USERS, {
        fetchPolicy: 'no-cache',
        // onCompleted: data => console.log(JSON.stringify(data.allOtherUsers)),
        onCompleted: data => setUsers(data.allOtherUsers),
    });

    const refreshMessages = () =>
    {
        console.log('refreshMessages');
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
                        <button onClick={() => refreshMessages()} >Refresh</button>

                        <MessageList
                            selectedUserId={selectedUser._id}
                        />
                    </>

                )}
            </div>
        </>
    );
};

export default Messages;
