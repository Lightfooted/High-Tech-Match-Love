import React from "react";
import Jumbotron from "../components/Jumbotron";

const WaitPage = () => {
  return (
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
  );
};

export default WaitPage;
