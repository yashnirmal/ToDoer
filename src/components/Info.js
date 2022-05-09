import React from 'react';
import "./Info.css";
import todoImg from "../assets/todo.jpeg";
import noteImg from "../assets/notes.jpeg";
import teamImg from "../assets/team.jpeg";

export default function Info() {
  return (
    <>
      <div className="info-container-div">
        <div className="item1-div">
          <img src={todoImg} alt="" />
        </div>
        <div className="item2-div">
          <h1>Free up your mental space</h1>
          <p>
            Regain clarity and calmness by getting all those tasks out of your
            head and onto your to-do list, no matter where your are. All you
            need is an internet connection.
          </p>
        </div>
      </div>

      <div
        className="info-container-div"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="item2-div">
          <h1>Find your productivity happy place</h1>
          <p>
            ToDoEr is a powerful tool for managing your tasks right alongside
            all of the information you work with every day.
          </p>
        </div>
        <div className="item1-div">
          <img src={noteImg} alt="" />
        </div>
      </div>

      <div className="info-container-div">
        <div className="item1-div">
          <img src={teamImg} alt="" />
        </div>
        <div className="item2-div">
          <h1>A second brain, for you, forever.</h1>
          <p>
            ToDoEr is a powerful tool that can help executives, entrepreneurs
            and creative people capture and arrange their ideas.
          </p>
          <p>
            All you have to do is use it.The human brain is non-linear: we jump
            from idea to idea, all the time. Your second brain should work the
            same.
          </p>
        </div>
      </div>
    </>
  );
}
