import React from 'react';
import "./About.css";
import Carosol from './Carosol';
import TeamSection from './TeamSection';
import Info from "./Info";

export default function About() {
  return (

    <>
      <Carosol />
      <div className="about-us">
        <p className="head">ABOUT US</p>
      </div>
      <Info />
      <TeamSection/>
    </>
  );
}
