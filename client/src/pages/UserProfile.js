import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import defaultUserPic from "../assets/genericuser.png";

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

    const [updateUser] = useMutation(UPDATE_USER, {
        onError: (err) => {
            console.log(`BrendaJ error: ${err}`);
        }
    });

    async function handleProfilePicUpdate(e) {
        const url = e.info.url;
        const mutationResponse = await updateUser({
            variables: { profilePicUrl: url },
        });

        setUser(mutationResponse.data.updateUser);
    }

    async function handleProfilePicUpdateFailure(e) {
        console.log(`BrendaJ failureCallBack`);
    }

    async function handleFormSubmit(e) {
        /* gather up the data and update the user */
        const info = {
            lastName: e.target.lastName.value,
            firstName: e.target.firstName.value,
            bio: e.target.bio.value,
            location: e.target.location.value,
            age: parseInt(e.target.age.value),
            githubId: e.target.githubId.value,
            profilePicUrl: user.profilePicUrl // see comments in handleFormChange
        };

        try {
            const mutationResponse = await updateUser({
                variables: info,
            });

            setUser(mutationResponse.data.updateUser);
        } catch (e) {
            alert(`error while saving user: ${e}`);
        }
    }

    async function handleFormChange(e) {
        setUser({...user,[e.target.name]:e.target.value})
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="user-profile-container">
                <img alt='profile-pic' width={'300px'} src={user.profilePicUrl ? user.profilePicUrl : defaultUserPic} />
            </div>
            <div className="widget">
            <WidgetLoader />
            <Widget
                sources={['local']}
                resourceType={'image'}
                cloudName={'htmlove'}
                uploadPreset={'cuvud7q0'}
                buttonText={'Edit Profile Picture'}
                style={{
                    fontSize: '20px',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    padding: '12px 15px',
                }}
                folder={'htmloveprofilepics'}
                cropping={false}
                onSuccess={handleProfilePicUpdate}
                onFailure={handleProfilePicUpdateFailure}
                logging={true}
                eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
                use_filename={false}
            />
            </div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={user.firstName || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={user.lastName || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input type="text" name="age" value={user.age || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <input type="text" name="location" value={user.location || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <div>
                    <label>
                        GitHub ID:
                        <input type="text" name="githubId" value={user.githubId || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <div >
                    <label>
                        Bio:
                        <textarea name="bio" rows="5" value={user.bio || ''} onChange={handleFormChange} />
                    </label>
                </div>
                <input className="profile-submit" type="submit" value="Submit"/>
            </form>

        
        </>
    );
};

export default UserProfile;
