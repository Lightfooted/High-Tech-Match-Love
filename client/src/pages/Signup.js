import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                    firstName: formState.firstName,
                    lastName: formState.lastName,
                    githubId: formState.githubId
                },
            });

            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div>
            <Link className="login" to="/login">← Go to Login</Link>

            <h2 className="signup-title">New here?</h2>
            <p style={{textAlign:'center'}}>Sign up and find your high tech love match!</p>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="githubId">GitHub ID:</label>
                    <input
                        name="githubId"
                        type="githubId"
                        id="githubId"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">{error.message}</p>
                    </div>
                ) : null}

                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
