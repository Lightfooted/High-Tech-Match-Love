import React, { useState, useEffect } from "react";

const GitUsers = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/search/users?q=type%3Auser');
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
        <h1>Fetching Data</h1>
        <div>{data.total_count.items}</div>
      </div>
    );
  }
};
export default GitUsers;