import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE_PIC } from '../../utils/mutations';


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

            <input type='file' onChange={handleFileChange} />
            {/* <input type='file' onChange={(evt) => { setSelectedImage(evt.target.files[0]); } } /> */}
        </div></>
);
};

export default UserProfilePic;