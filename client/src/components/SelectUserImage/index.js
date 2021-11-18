import React, { useState } from 'react';
// We will import Apollo Client and utila/queries to grab data for the current logged in user.
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const UserProfile = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const { loading, data } = useQuery(QUERY_USER);

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <><div className="card">

      <img src="https://picsum.photos/200" alt="user-pic" />

      <p className='user-name'>Name: {user.firstName} {user.lastName}</p>
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

export default UserProfile;