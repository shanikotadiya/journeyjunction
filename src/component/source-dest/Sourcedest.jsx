import React from "react";
import "./Sourcedest.css";

const Sourcedest = () => {
  return (
    <>
      <div className="container">
        <div className="heading">
          <h3>Enter Source and Destination</h3>
        </div>
        <div className="input-fields">
          <div className="input-box">
            <span className="icon">
              <ion-icon name="flag"></ion-icon>
            </span>
            <input type="text" placeholder="source" required />
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="location"></ion-icon>
            </span>
            <input type="text" placeholder="destination" required />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Sourcedest;
