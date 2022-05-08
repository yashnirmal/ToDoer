import React from 'react';
import "./Footer.css";
import githubLogo from "../assets/twiiter.png"
import instaLogo from "../assets/insta.png"
import linkedInLogo from "../assets/linked.png"
import {Link} from 'react-router-dom'
import fbLogo from '../assets/fb.png'

export default function Footer() {
  return (
    <footer>
      <div class="footer-content">
        <h1 style={{fontWeight:"bold"}}>ToDoEr</h1>
        <p style={{fontSize:18}}>
          A place where you can organize and manage your day-to-day tasks and
          activities efficiently. The best way to organize your personal and
          work-life and help you to stay focused and motivated towards your
          goals. ToDoEr is a simple to use and user-friendly website to organize
          your life.
        </p>
        <ul class="socials">
          <li>
            <a href="https://instagram.com/yashnirmal_15?igshid=YmMyMTA2M2Y=" target="_blank">
              <img src={instaLogo} alt="" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100081038082644" target="_blank">
              <img src={fbLogo} alt="" />
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>copyright &copy; ToDoEr Inc.</p>
        <div class="footer-menu">
          <ul class="f-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
