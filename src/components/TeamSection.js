import React from 'react';
import "./TeamSection.css";
import instaLogo from "../assets/insta.png";
import linkedInLogo from "../assets/linked.png";
import twitterLogo from "../assets/twiiter.png";
import githubLogo from "../assets/git.png";


export default function TeamSection() {
  return (
    <>
      <div class="team-container">
        <h1 class="profile-heading">Our Team</h1>

        <div class="profiles-container">
          <div class="user-profile">
            <img
              src="https://media2.giphy.com/media/XpLdhYseuf3mtwJ5Zy/giphy.gif?cid=ecf05e471ngdhpwbccc2whlg0pwvpkd6r3wr44crgg2t8mgm&rid=giphy.gif&ct=g"
              class="profile-img"
            />
            <h3 class="user-name">Yash Nirmal</h3>
            <h5>Co-Founder</h5>
            <p>
              <b>E-mail</b> : yash15nirmal@gmail.com 
            <br />
              Student, National Institute of Technology Karnataka,Surathkal.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <a
                href="https://instagram.com/yashnirmal_15?igshid=YmMyMTA2M2Y="
                target="_blank"
              >
                <img src={instaLogo} alt="" />
              </a>
              <a
                href="https://www.linkedin.com/in/yash-nirmal-062b68220/"
                target="_blank"
              >
                <img src={linkedInLogo} alt="" />
              </a>
              <a href="https://twitter.com/YashNirmal42" target="_blank">
                <img src={twitterLogo} alt="" />
              </a>
              <a href="https://github.com/yashnirmal" target="_blank">
                <img src={githubLogo} alt="" />
              </a>
            </div>
          </div>

          <div class="user-profile">
            <img
              src="https://media4.giphy.com/media/HifsMXFLaRsmQlx8jo/giphy.gif?cid=790b76114f3feda7c0b696c827384945808dc7f3c8a07292&rid=giphy.gif&ct=g"
              class="profile-img"
            />
            <h3 class="user-name">Kartikeya Ranjan</h3>
            <h5>Co-Founder</h5>
            <p>
              <b>E-mail</b> : kartikeyaranjan01@gmail.com 
            <br />
              Student, National Institute of Technology Karnataka,Surathkal.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <a
                href="https://instagram.com/kartikeya02?igshid=YmMyMTA2M2Y="
                target="_blank"
              >
                <img src={instaLogo} alt="" />
              </a>
              <a
                href="https://www.linkedin.com/in/kartikeya-ranjan-845693201/"
                target="_blank"
              >
                <img src={linkedInLogo} alt="" />
              </a>
              <a href="https://twitter.com/KartikeyaRanjan" target="_blank">
                <img src={twitterLogo} alt="" />
              </a>
              <a href="https://github.com/kartikeya01" target="_blank">
                <img src={githubLogo} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
