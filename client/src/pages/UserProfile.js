import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import defaultUserPic from "../assets/genericuser.png";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import githubCute from '../assets/github-cute.png'


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
        <OuterContainer>
            <LeftContainer>
                <EditProfileBox>
                    <Link to="/editprofile">
                        <button>Edit Profile</button>
                    </Link>
                </EditProfileBox>

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
            </LeftContainer>

            <RightContainer>
                {/* <div>Following: {user.rightSwipes}</div> */}
                {console.log(user)}
                {Array.isArray(user.rightSwipes) ?
                    user.rightSwipes.map((user) => (
                        <Individual key={user.login}>
                            {/* {console.log({user})} */}
                            <Image alt='pic' src={user.avatar_url} />

                            <Username>{user.login}</Username>
                            <Link to={{ pathname: user.html_url }} target="_blank">
                                <img className="github-link" src={githubCute} />
                            </Link>

                        </Individual>
                    ))
                    :
                    null}
            </RightContainer>

        </OuterContainer>
    );
};

const OuterContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 1rem;
`
const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0px 1rem;
    align-items: flex-start;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 1rem;
`

const EditProfileBox = styled.div`
    text-align: right;
`
const Individual = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: rgba(255,255,255,.5);
    width: 150px;
    margin: 10px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 30px 30px 0 0;

    @media (max-width:512px){
        width: 25%;
    }
`
const Username = styled.p`
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: italic;
    font-weight: bold;
`

const Image = styled.img`
    border-radius: 30px 30px 0 0;
`
export default UserProfile;
