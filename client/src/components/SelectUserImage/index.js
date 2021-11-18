import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE_PIC } from '../../utils/mutations';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';


const UserProfilePic = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    // const [addProfilePic, { error }] = useMutation(ADD_PROFILE_PIC);
    const [addProfilePic, { data, loading }] = useMutation(ADD_PROFILE_PIC, {
        onError: (err) => {
            console.log(`bjj error: ${err}`);
        }
      });

    async function successCallBack(e) {
        const url = e.info.url;
        console.log(`successCallBack url: ${url}`);
        const mutationResponse = await addProfilePic({
            variables: { picPath: url },
        });
        console.log(`response: ${JSON.stringify(mutationResponse)}`);
        setSelectedImage(url);
    }

    async function failureCallBack(e) {
        console.log(`failureCallBack`);
    }

    return (

        <>
            <div className="card">

                {/* <img src="https://picsum.photos/200" alt="user-pic" /> */}
                <p className='user-name'>Name:</p>
                <p className='age'>Age:</p>
                <p className='location'>Locaton:</p>
                <p className='bio'>Bio:</p>
                <p className='gitlink'>Github Link:</p>

            </div>

            <div>
                {selectedImage && (
                    <div>
                        <img alt='user-pic' width={'300px'} src={selectedImage} />
                        {/* <button onClick={() => setSelectedImage(null)}>Delete</button> */}
                    </div>
                )}

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






export default UserProfilePic;