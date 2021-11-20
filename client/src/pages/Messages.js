import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_ALL_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

const Messages = () => {

    const [users, setUsers] = useState([]);

    const { loading, error } = useQuery(QUERY_ALL_USERS, {
        fetchPolicy: 'no-cache',
        // onCompleted: data => console.log(JSON.stringify(data.allUsers)),
        onCompleted: data => setUsers(data.allUsers),
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}>
                <h3>Users:</h3>
                <ul>
                    {users && users.map(user => (
                        <li key={user._id}>
                            {user.firstName} {user.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Messages;
