import React, { useState, useEffect } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import defaultUserPic from "../../assets/genericuser.png";


const UserProfile = () => {

    const [ user, setUser] = useState({});
    const { loading, error } = useQuery(QUERY_USER, { fetchPolicy: 'no-cache',
        onCompleted: data => setUser(data.user),
      });

    const [updateUser] = useMutation(UPDATE_USER, {
        onError: (err) => {
            console.log(`BrendaJ error: ${err}`);
        }
    });

    async function successCallBack(e) {
        const url = e.info.url;
        const mutationResponse = await updateUser({
            variables: { profilePicUrl: url },
        });
        
        setUser(mutationResponse.data.updateUser);
    }

    async function failureCallBack(e) {
        console.log(`BrendaJ failureCallBack`);
    }

    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="card">

                <div>
                    <img alt='user-pic' width={'300px'} src={user?.profilePicUrl || defaultUserPic} />
                </div>

                <p className='user-name'>Name: {user?.firstName} {user?.lastName}</p>
                <p className='age'>Age:</p>
                <p className='location'>Location:</p>
                <p className='bio'>Bio:</p>
                <p className='gitlink'>Github Link:</p>

            </div>

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
                    height: '25px'
                }}
                folder={'htmloveprofilepics'}
                cropping={false}
                onSuccess={successCallBack}
                onFailure={failureCallBack}
                logging={true}
                eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
                use_filename={false}

            />
        </>
    );
};

export default UserProfile;
