import React, { useState, createContext, useContext } from 'react';

// Simple Sidebar Context
const SidebarContext = createContext();

// Simple Sidebar Provider
export const SidebarProvider = ({ children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to use sidebar
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Simple Sidebar Component
export const Sidebar = ({ children, className = '' }) => {
  const { isOpen } = useSidebar();
  
  return (
    <aside 
      className={`sidebar ${isOpen ? 'open' : 'closed'} ${className}`}
      style={{
        width: isOpen ? '250px' : '0',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        height: '100vh'
      }}
    >
      {children}
    </aside>
  );
};

// Simple Sidebar Toggle Button
export const SidebarTrigger = ({ children = '☰' }) => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <button 
      onClick={toggleSidebar}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0.5rem'
      }}
    >
      {children}
    </button>
  );
};

// Simple Sidebar Content
export const SidebarContent = ({ children }) => {
  return (
    <div className="sidebar-content" style={{ padding: '1rem' }}>
      {children}
    </div>
  );
};