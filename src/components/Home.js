import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import React,{useState} from 'react';
import { auth } from './Firebase';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Snackbar from 'node-snackbar';


export default function Home(props) {

    let navigate = useNavigate();

    async function submitBtnClicked(e){
        if(document.querySelector(".login").classList.contains('selected')){
            // login button selected
            const email = document.querySelector('.email').value;
            const password = document.querySelector(".password").value;
            
            try {
                await signInWithEmailAndPassword(auth,email,password)
                .then(()=>{
                  props.handleSnack("Login Success! Welcome "+email,"success");
                  navigate('/tasks');
                });
            } catch (error) {
              props.handleSnack("Wrong Mail/Password","error");
            }

        }
        else {
            // register button selected
            const email = document.querySelector('.email').value;
            const password = document.querySelector('.password').value;
            const confirmPassword = document.querySelector('.confirm-password').value;
            if(password!==confirmPassword){
              props.handleSnack("Passwords don't match", "error");
              return;
            }
            try{
              await createUserWithEmailAndPassword(auth,email,password)
              .then((userCredentials)=>{
                props.handleSnack("Register Success! Welcome "+email,"success");
                navigate('/tasks');
              });
                
            }catch(err){
              props.handleSnack("Registration Error! Try Again ", "error");
            }


        }
    }


  return (
    <div className="container">
      <div className="left">
        <div className="tagline-div">
          <h3 className="tagline">Manage your day to day task easily</h3>
        </div>
      </div>

      <div className="right">
        <div className="login-register-div">
          <div className="login-register">
            <div
              className="login selected"
              onClick={(e) => {
                if (e.target.classList[1] !== "selected") {
                  e.target.classList.add("selected");
                  document
                    .querySelector(".register")
                    .classList.remove("selected");
                  document
                    .querySelector(".register-confirm-passwor-div")
                    .classList.add("display-toggle");
                }
              }}
            >
              Login
            </div>
            <div
              className="register"
              onClick={(e) => {
                if (e.target.classList[1] !== "selected") {
                  e.target.classList.add("selected");
                  document.querySelector(".login").classList.remove("selected");
                  document
                    .querySelector(".register-confirm-passwor-div")
                    .classList.remove("display-toggle");
                }
              }}
            >
              Register
            </div>
          </div>
          <div className="login-form">
            <div className="register-email-div">
              Email :{" "}
              <input
                className="email Input"
                type="email"
                placeholder="E-Mail"
              />
            </div>
            <div className="register-password-div">
              Password :{" "}
              <input
                className="password Input"
                type="password"
                placeholder="Password"
              />
              </div>
            <div className="register-confirm-passwor-div display-toggle">
              Confirm Password :{" "}
              <input
                className="confirm-password Input"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <button className="submit-btn" onClick={submitBtnClicked}>
              Submit
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}
