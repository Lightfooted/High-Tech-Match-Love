import React, { useState, useEffect } from "react";
import { randomNumber } from '../utils/random';
import { ADD_RIGHT_SWIPE } from '../utils/mutations'
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";

const SwipeProfile = () => {
    const [data, setData] = useState([]);
    const [searchInput, setsearchInput] = useState('');

    const { addRightSwipe } = useMutation(ADD_RIGHT_SWIPE)

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

    const handleSwipe = async (action) => {
        if (action === 'save') {
            // await addRightSwipe({ 
            //     variables: 
            // })
            console.log(data[githubIndex])
        }
        else if (action === 'dismiss') {
            console.log('hello')
        }
        setGithubIndex(githubIndex + 1)
    }

    if (!searchInput) return <div>...loading</div>;
    else {
        return (
            <div>
                {Array.isArray(data) ?
                    <div>
                        <div className="swiper-container">
                            <div className="swiper">
                                <p>Login ID: {data[githubIndex].login}, GitHub ID: {data[githubIndex].id} </p>
                                <a href={data[githubIndex].url} ></a>
                                <img className='swiper-img' alt='pic' src={data[githubIndex].avatar_url} />
                                <div>
                                    <button onClick={() => handleSwipe('dismiss')}>Dismiss</button>
                                    <button onClick={() => handleSwipe('save')} >Request Match</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Jumbotron>
                            <h1 className="no-match">Please give us some minutes while we look up more intersting developers for you</h1>
                            <h1>
                                <span role="img" aria-label="waiting clock">
                                    🕰️
                                </span>
                            </h1>
                        </Jumbotron>
                    </div>
                }
            </div>
        );
    }
};
export default SwipeProfile;