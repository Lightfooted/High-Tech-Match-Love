import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../Firebase';

function CreateRoom() {

	const history = useHistory();
	const [room, setRoom] = useState({ chatname: '' });
	const ref = firebase.database().ref('rooms/');

	const save = (event) => {
		event.preventDefault();
		ref.orderByChild('chatname').equalTo(room.chatname).once('value', snapshot => {
			if (snapshot.exists()) {
				return (
					alert('There is already a chat room with this name!')
				);
			} else {
				const newChatRoom = firebase.database().ref('rooms/').push();
				newChatRoom.set(room);
				history.goBack();
			}
		});
	};

	const onChange = (event) => {
		event.persist();
		setRoom({...room, [event.target.name]: event.target.value});
	}

	return (
			<main className="create-chat-room">
					<h2 className="create-chat-room-title">Create a new name for your chat room</h2>
					<form onSubmit={save}>
							<section>
									<label>Chat room name:</label>
									<input type='text' name='chatname' id='chatname' placeholder='*****************' value={room.chatname} onChange={onChange} />
							</section>
							<button type='submit'>
									Enter
							</button>
					</form>
			</main>
	);
}

export default CreateRoom;