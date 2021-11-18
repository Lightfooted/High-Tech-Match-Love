import React, { useState } from 'react';

const UserProfilePic = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

        <input type='file' onChange={(evt) => { setSelectedImage(evt.target.files[0]); } } />
      </div></>
  );
};

export default UserProfilePic;