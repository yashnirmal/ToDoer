import "./Contact.css";
import emailjs from 'emailjs-com';
import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';


export default function Contact(props) {

  const form = useRef();

  function sendBtnClicked(e){
    let mailInput = document.getElementById('mailIdInput');
    e.preventDefault();


    if(mailInput.value==""){
      props.handleSnack("Mail field is Empty!","error");
      return;
    }

    emailjs.sendForm(
      "service_4vd67gd",
      "template_1tfkbqk",
      form.current,
      "kYY-TPypqA7rKTppt"
    )
    .then((response,error)=>{
      console.log(response.text);
      props.handleSnack("Thank You! Your feedback has been recorded.","success");
    })
    .catch((err)=>console.log(err.message));
  }


  return (
    <div className="contact-container">
      <div className="contact-div">
        <h1 style={{ marginBottom: 50 }}>Contact Us</h1>
        
        <form ref={form} onSubmit={sendBtnClicked}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
            >
            <div style={{ flex: 1, marginRight: 30 }}>
              <p>Your E-Mail</p>
              <input
                style={{ width: "100%", marginBottom: 5, marginTop: 5 }}
                className="Input"
                placeholder="Mail Id"
                type="email"
                id="mailIdInput"
                name="mailId"
              />
            </div>
            <div style={{ flex: 1 }}>
              <p>Subject</p>
              <input
                className="Input"
                style={{ width: "100%", marginBottom: 5, marginTop: 5 }}
                placeholder="Subject"
                type="text"
                id="subjectInput"
                name="subject"
              />
            </div>
          </div>
          <p>Description</p>
          <textarea
            className="Input"
            style={{ width: "100%", height: 150, marginBottom: 20, marginTop: 5 }}
            placeholder="Tell us what you are thinking"
            id="descriptionInput"
            name="description"
          ></textarea>
          <button className="send Button" type="submit">Send</button>
          
        </form>
      </div>
    </div>
  );
}
