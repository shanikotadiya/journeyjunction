import React from "react";
import naturevideo from "../../componentpic/videobg3.mp4";
import Navbar from "../Navbar/navbar";
import SuggestionSlider from "../Suggestion/suggestionslider";
import Sourcedest from "../source-dest/Sourcedest";
import Footer from "../footer/Footer";
// import  Loginregister from '../login-register/Loginregister.jsx';

const Body = () => {
  return (
    <>
    {/* <Loginregister/> */}
      <Navbar />
      <video src={naturevideo} autoPlay loop muted className="video-bg" />
        <Sourcedest />
        <SuggestionSlider />
        <Footer />
    </>
  );
};
export default Body;
