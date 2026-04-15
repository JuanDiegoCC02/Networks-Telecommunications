import React from 'react';

/**
 * AdminNav Component
 * Handles the logic for switching between the 'cameras' and 'routers' views.
 * All styling is deferred to the external CSS classes: .admin-nav-tabs, .nav-item, and .active.
 */
export default function AdminNav({ activeTab, setActiveTab }) {
  
  // Data array containing only the two required functional tabs
  const navigationTabs = [
    { id: 'cameras', label: 'Cameras', icon: '📸' },
    { id: 'routers', label: 'Routers', icon: '🌐' }
  ];

  return (
    <nav className="admin-nav-tabs">
      {navigationTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          // Triggers the state update in the parent component (AdminBody)
          onClick={() => setActiveTab(tab.id)}
          // Applies the 'active' class only to the currently selected tab
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}