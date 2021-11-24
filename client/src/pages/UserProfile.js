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
                    Edit Profile
                </Link>
            </div>
            {console.log(user)}
            <div className="user-profile-container">
                <img alt='profile-pic' width={'300px'} src={user.profilePicUrl ? user.profilePicUrl : defaultUserPic} />
            </div>
            <div>
                <div>

                    First Name:
                    <div type="text" name="firstName" value={user.firstName || ''} />

                </div>
                <div>

                    Last Name:
                    <div type="text" name="lastName" value={user.lastName || ''} />

                </div>
                <div>

                    Age:
                    <div type="text" name="age" value={user.age || ''} />

                </div>
                <div>

                    Location:
                    <div type="text" name="location" value={user.location || ''} />

                </div>
                <div>

                    GitHub ID:
                    <div type="text" name="githubId" value={user.githubId || ''} />

                </div>
                <div >

                    Bio:
                    <textarea name="bio" rows="5" value={user.bio || ''} />

                </div>
            </div>


        </>
    );
};

export default UserProfile;
