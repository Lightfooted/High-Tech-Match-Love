import React, { useState } from 'react';

const UserProfilePic = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img alt='user-pic' width={'300px'} src={URL.createObjectURL(selectedImage)} />
            <button onClick={()=>setSelectedImage(null)}>Delete</button>
        </div>
      )}

      <input type='file' onChange={(evt) => { setSelectedImage(evt.target.files[0]); }} />
    </div>
  );
};

export default UserProfilePic;