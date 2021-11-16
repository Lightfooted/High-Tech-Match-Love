import React, { useState, useEffect } from "react";

const GitUsers = () => {
  const [data, setData] = useState(['']);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/search/users?q=type%3Ausa');
        const data = await response.json();

        setData(data);
        console.log(data);
        setIsLoaded(true);
      } catch (e) {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (!isLoaded) return <div>...loading</div>;
  else {
    return (
      <div className="GitUsers">
        <h1>Fetching data by user location in USA</h1>
        <div>{data.items[(0,29)].url}</div>
      </div>
    );
  }
};
export default GitUsers;