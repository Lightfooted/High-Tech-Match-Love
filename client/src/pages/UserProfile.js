import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import defaultUserPic from "../assets/genericuser.png";
import { Link } from "react-router-dom";

const UserProfile = () => {

    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        bio: '',
        location: '',
        age: '',
        githubId: '',
        profilePicUrl: defaultUserPic
    });

    const { loading } = useQuery(QUERY_USER, {
        fetchPolicy: 'no-cache',
        onCompleted: data => setUser(data.user),
    });


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Link to="/editprofile">
                    <button>Edit Profile</button>
                </Link>
            </div>

            <div className="user-profile-container">
                <img alt='profile-pic' width={'300px'} src={user.profilePicUrl ? user.profilePicUrl : defaultUserPic} />
            </div>

            <div>
                <div>
                    <div>Name: {user.firstName} {user.lastName}</div>
                </div>
                <div>
                    <div>Age: {user.age}</div>
                </div>
                <div>
                    <div>Location: {user.location}</div>
                </div>
                <div>
                    <div>GitHub ID: {user.githubId}</div>
                </div>
                <div >
                    <div>Bio: {user.bio}</div>
                </div>
            </div>


        </>
    );
};

export default UserProfile;
