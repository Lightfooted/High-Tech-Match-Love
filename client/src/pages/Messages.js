import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_ALL_OTHER_USERS } from '../utils/queries';
import MessageList from '../components/MessageList';
import { useQuery } from '@apollo/client';

const Messages = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { loading /*, error */ } = useQuery(QUERY_ALL_OTHER_USERS, {
        fetchPolicy: 'no-cache',
        onCompleted: data => setUsers(data.allOtherUsers),
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <div className="message-page-wrapper" style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}> */}
            <div className="message-page-wrapper">
                <div className="message-page-row">
                    <div className="message-page-column">
                        <div className="message-user-column">
                        <h3>Users:</h3>

                        <button className="message-page-user-button" key={'noone'} onClick={() => setSelectedUser(null)}>Clear User Selection</button>
                        {users && users.map(user => (
                            <button className="message-page-user-button" key={user._id} onClick={() => setSelectedUser(user)}>{user.firstName} {user.lastName}</button>
                        ))}
                    </div>
                </div>
                <div className="message-page-wide-column">
                    <div className="message-messages-column">
                        {selectedUser && (
                            <>
                                <h3>Here are your messages with {selectedUser.firstName} {selectedUser.lastName}</h3>
                                <MessageList
                                    selectedUserId={selectedUser._id}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Messages;
