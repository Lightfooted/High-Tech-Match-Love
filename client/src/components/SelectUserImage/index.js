import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import defaultUserPic from "../../assets/genericuser.png";


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

    const { loading, error } = useQuery(QUERY_USER, {
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
        // why is the elements getting overwritten on each change in the other form elements?
        // for now, re-set the info to the same thing to work around the issue
        const saveUrl = user.profilePicUrl;
        // save the state
        setUser({ [e.target.name]: e.target.value, profilePicUrl: saveUrl });
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}>
                <img alt='profile-pic' width={'300px'} src={user.profilePicUrl} />
            </div>
            <form style={{ marginLeft: 50, marginRight: 50 }} onSubmit={handleFormSubmit}>
                <div style={{marginTop:10}}>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={user.firstName} onChange={handleFormChange} />
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={user.lastName} onChange={handleFormChange} />
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>
                        Age:
                        <input type="text" name="age" value={user.age} onChange={handleFormChange} />
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>
                        Location:
                        <input type="text" name="location" value={user.location} onChange={handleFormChange} />
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>
                        GitHub ID:
                        <input type="text" name="githubId" value={user.githubId} onChange={handleFormChange} />
                    </label>
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>
                        Bio:
                        <textarea name="bio" rows="5" style={{ width: 300 }} value={user.bio} onChange={handleFormChange} />
                    </label>
                </div>
                <input type="submit" value="Submit" style={{ marginTop: 10 }} />
            </form>

            <WidgetLoader />
            <Widget
                sources={['local']}
                resourceType={'image'}
                cloudName={'htmlove'}
                uploadPreset={'cuvud7q0'}
                buttonText={'Upload Profile Picture'}
                style={{
                    color: 'white',
                    border: 'none',
                    width: '120px',
                    backgroundColor: 'green',
                    borderRadius: '4px',
                    height: '25px',
                    marginTop: '10px'
                }}
                folder={'htmloveprofilepics'}
                cropping={false}
                onSuccess={handleProfilePicUpdate}
                onFailure={handleProfilePicUpdateFailure}
                logging={true}
                eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
                use_filename={false}

            />
        </>
    );
};

export default UserProfile;
