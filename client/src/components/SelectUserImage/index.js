import React, { useState } from 'react';

const UserProfilePic = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = async (e) => {
        e.preventDefault();

        try {
            const enteredFileName = e.target.files[0];
            // save the file to storage
            const savedUrl = saveProfilePic(enteredFileName);
            // save the file in the user's account
            // const mutationResponse = await addProfilePic({
            //     variables: { picPath: savedUrl },
            // });
            setSelectedImage(savedUrl);
        } catch (err) {
            console.log(err);
        }
    }

return (

    <><div class="card">

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
        </div></>
);
};

export default UserProfilePic;