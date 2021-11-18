import React, { useState, useEffect } from "react";
import { randomNumber } from '../utils/random';

const SwipeProfile = () => {
    const [data, setData] = useState([]);
    const [searchInput, setsearchInput] = useState('');

    const gitSearchString = (numResults) => {
        const sinceId = randomNumber(1, 30000000);

        return `https://api.github.com/users?per_page=100&since=${sinceId}`;
    }

    const [githubIndex, setGithubIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(gitSearchString());
                const data = await response.json();
                setData(data);

                // console.log(data);
                setsearchInput(true);
            } 
            catch (e) {
                setsearchInput(true);
            }
        };
        fetchData();
    }, []);

    if (!searchInput) return <div>...loading</div>;
    else {
        return (

            <div className="swiper">
                <p>Login ID: {data[githubIndex].login}, GitHub ID: {data[githubIndex].id} </p>
                <a href={data[githubIndex].url} >Github Link </a>
                <img alt='pic' src={data[githubIndex].avatar_url} />
                <div>
                <button
                onClick={() => setGithubIndex(githubIndex + 1)}
                >Dismiss</button>
                <button
                onClick={() => setGithubIndex(githubIndex + 1)}
                >Request Match</button>
                </div>
            </div>

        );
    }
};
export default SwipeProfile;