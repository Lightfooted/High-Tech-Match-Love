import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE_PIC } from '../../utils/mutations';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';


const UserProfilePic = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [addProfilePic, { error }] = useMutation(ADD_PROFILE_PIC);


    async function handleFileChange(e) {
        e.preventDefault();

        try {
            const enteredFileName = e.target.files[0].name;
            console.log(`@@@@@@@@@@ enteredFileName: ${enteredFileName}`);
            // save the file to storage and save the URL in the user's account
            const mutationResponse = await addProfilePic({
                variables: { picPath: enteredFileName },
            });
            console.log(`@@@@@@@@@@ after addProfilePic`);
            const savedUrl = mutationResponse.data.addProfilePic.user.profilePicUrl;
            console.log(`@@@@@@@@@@ savedUrl: ${savedUrl}`);
            setSelectedImage(savedUrl);
            console.log(`@@@@@@@@@@ selected image set`);
        } catch (err) {
            console.log(err);
        }
    }

    async function successCallBack(e) {
        console.log(`successCallBack`);
    }

    async function failureCallBack(e) {
        console.log(`failureCallBack`);
    }

    return (

        <><div className="card">

            <img src="https://picsum.photos/200" alt="user-pic" />
            <p className='user-name'>Name:</p>
            <p className='age'>Age:</p>
            <p className='location'>Locaton:</p>
            <p className='bio'>Bio:</p>
            <p className='gitlink'>Github Link:</p>

        </div>

            <div>
                {selectedImage && (
                    <div>
                        <img alt='user-pic' width={'300px'} src={URL.createObjectURL(selectedImage)} />
                        <button onClick={() => setSelectedImage(null)}>Delete</button>
                    </div>
                )}

            </div>

            <WidgetLoader />
            <Widget
                sources={['local']}
                resourceType={'image'}
                cloudName={'htmlove'}
                uploadPreset={'cuvud7q0'}
                buttonText={'Upload'}
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