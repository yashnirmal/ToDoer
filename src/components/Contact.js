import React from 'react';
import "./Contact.css";


export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-div">
        <h1>Contact Us</h1>
        <textarea
          className="contact-textarea"
          placeholder="Tell us what you are thinking"
        ></textarea>
        <button className="send Button">Send</button>
      </div>
    </div>
  );
}
