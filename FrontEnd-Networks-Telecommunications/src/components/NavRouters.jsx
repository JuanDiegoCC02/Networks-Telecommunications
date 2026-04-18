import React from 'react';

export default function NavRouters({ view, setView }) {
  return (
    <nav className="bttnsNavContainer">
      <ul className="adminNavUl">
        <li 
          className={`adminNavLi ${view === 'add' ? 'active' : ''}`} 
          onClick={() => setView("add")}
        >
          <span className="navIcon">➕</span>
          <span className="navLabel">Add Routers</span>
          {view === "add" && <div className="activeIndicator" />}
        </li>

        <li 
          className={`adminNavLi ${view === 'visualizer' ? 'active' : ''}`} 
          onClick={() => setView("visualizer")}
        >
          <span className="navIcon">🔍</span>
          <span className="navLabel">Routers Visualizer</span>
          {view === "visualizer" && <div className="activeIndicator" />}
        </li>
      </ul>
    </nav>
  );
}