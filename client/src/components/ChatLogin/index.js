import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../Firebase';

function ChatLogin() {

    const history = useHistory();
    const [creds, setCreds] = useState({ moniker: '' });
    const ref = firebase.database().ref('users/');

    const onChange = (event) => {
        event.persist();
        setCreds({...creds, [event.target.name]: event.target.value});
    }

    const userLogin = (event) => {
        event.preventDefault();
        ref.orderByChild('moniker').equalTo(creds.moniker).once('value', snapshot => {
            if (snapshot.exists()) {
                localStorage.setItem('moniker', creds.moniker);
                history.push('/roomlist');
            } else {
                const newUser = firebase.database().ref('users/').push();
                newUser.set(creds);
                localStorage.setItem('moniker', creds.moniker);
                history.push('/roomlist');
            }
        });
    };

    return (
			<div>
					<main>
							<form className='chat-login' onSubmit={userLogin}>
									<div>
													<label>Chat Username:</label>
													<input type='text' name='moniker' id='moniker' placeholder='username' value={creds.moniker} onChange={onChange} />
									</div>
									<button type='submit'>
													Enter
									</button>
							</form>
					</main>
			</div>
    );
}

export default ChatLogin;