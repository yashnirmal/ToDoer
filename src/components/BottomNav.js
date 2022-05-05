import React from 'react'
import { Link } from 'react-router-dom';
import "./BottomNav.css";


export default function BottomNav() {
  return (
    <div className="bottom-navigtion">
      <div className="navigation-tasks">
        <Link to="/tasks">TASKS</Link>
      </div>
      <div className="navigation-notes">
        <Link to="/notes">NOTES</Link>
      </div>
    </div>
  );
}
