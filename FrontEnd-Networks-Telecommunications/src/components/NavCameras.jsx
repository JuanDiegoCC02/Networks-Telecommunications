import React from 'react';
import "../styles/NavCamRou.css";

export default function NavCameras({ view, setView }) {
  return (
    <nav className="bttnsNavContainer">
      <ul className="adminNavUl">

        {/* ADD */}
        <li 
          className={`adminNavLi ${view === 'add' ? 'active' : ''}`} 
          onClick={() => setView("add")}
        >
          <span className="navIcon">📝</span>
          <span className="navLabel">Add Cameras</span>
          {view === "add" && <div className="activeIndicator" />}
        </li>

        {/* VISUALIZER */}
        <li 
          className={`adminNavLi ${view === 'visualizer' ? 'active' : ''}`} 
          onClick={() => setView("visualizer")}
        >
          <span className="navIcon">🔎</span>
          <span className="navLabel">Cameras Visualizer</span>
          {view === "visualizer" && <div className="activeIndicator" />}
        </li>
      </ul>
    </nav>
  );
}