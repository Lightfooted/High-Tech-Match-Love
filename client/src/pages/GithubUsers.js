import React, { useState, useEffect } from "react";

const GitUsers = () => {
  const [data, setData] = useState([]);
  const [searchInput, setsearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        // https://api.github.com/search/users?q=type%3Ausa
        const data = await response.json();

        setData(data);
        console.log(data);
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
        <h1>List of users:</h1>
        {data.map((user) => (
          <div>
          <p>{user.login}</p>
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