import React, { useState, useEffect } from "react";
import { randomNumber } from '../utils/random';

const GitUsers = () => {
    const [data, setData] = useState([]);
    const [searchInput, setsearchInput] = useState('');

    const gitSearchString = (numResults) => {
        // somewhat randomize the results we get.

        // github.com/users Lists all github users, in the order that they signed up on GitHub.
        // It accepts a parameters 'since' (integer), which is a numeric user ID. Sending this
        // parameter will return users with an ID greater than this ID. The ID's start at 1.
        // We can also send a parameter, `per_page`, indicating how many results we want, maximum of 100.
        // As of January 2020, there are over 40 million users, so it's pretty safe to assume we
        // can set the 'since' parameter to 30 million (deleted users don't get returned, and I'm
        // randomly guessing that at most 10 million have been outright deleted)
        const sinceId = randomNumber(1, 30000000);

        return `https://api.github.com/users?per_page=100&since=${sinceId}`;

        // /github.com/search/users works differently. You can pass in lots of different search criteria (see
        // https://docs.github.com/en/search-github/searching-on-github/searching-users for the full list of 
        // user search criteria).
        // It accepts a per_page parameter, indicating how many results we want, maximum 100.
        // Instead of using 'since', it uses 'page' - you can indicate which page of the results you want.
        // Since there are 40million users, and we want 100 per page, we could use a random page number up to 30 million.
        // This string searches for 100 people within the USA that show up on page number 'pageNum'
        // const pageNum = randomNumber(1, 30000000);
        // return `https://api.github.com/search/users?q=type%3Ausa&per_page=100&page=${pageNum}`
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(gitSearchString());

     
                // const response = await fetch('https://api.github.com/users');

                // const response = await fetch(`https://api.github.com/search/users?q=type%3Ausa`);
                // const response = await fetch(`https://api.github.com/search/users?per_page=100,q=type%3Ausa,per_page=100`);

                const data = await response.json();
                // if we fetch using github.com/users, 'data' is the array of users.
                // if we fetch using githubcom/search/users, 'data.items' is the array of users
                // setData needs the array of users
                setData(data);

                // console.log(data);
                setsearchInput(true);
            } catch (e) {
                setsearchInput(true);
            }
        };
        fetchData();
    }, []);

    if (!searchInput) return <div>...loading</div>;
    else {
        return (
            <div className="GitUsers">
                <h1>List of {data.length || 0} users:</h1>
                {data.map((user) => (
                    <div>
                        <p>Login ID: {user.login}, GitHub ID: {user.id} </p>
                        <a href={user.url} >Github Link </a>
                        <img alt='pic' src={user.avatar_url} />
                    </div>
                ))
                }
            </div>
        );
    }
};
export default GitUsers;