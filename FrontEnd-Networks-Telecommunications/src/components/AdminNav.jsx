import React from 'react';
import "../styles/AdminNav.css";

export default function AdminNav({ activeTab, setActiveTab }) {
  const navigationTabs = [
    { id: 'cameras', label: 'Cámaras', icon: '📸' },
    { id: 'routers', label: 'Routers', icon: '🌐' }
  ];

  return (
    <nav className="adminNavContainer">
      <ul className="adminNavUl">
        {navigationTabs.map((tab) => (
          <li 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`adminNavLi ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="navIcon">{tab.icon}</span>
            <span className="navLabel">{tab.label}</span>
            {activeTab === tab.id && <div className="activeIndicator" />}
          </li>
        ))}
      </ul>
    </nav>
  );
}