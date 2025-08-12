import React, { useState, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  Star,
  Play,
  Bookmark
} from 'lucide-react';
import '../css/NavBar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Play },
    { name: 'Movies', href: '/movies', icon: Star },
    { name: 'TV Shows', href: '/tv-shows', icon: Play },
    { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
    { name: 'Favorites', href: '/favorites', icon: Star }
  ];

  const currentPath = window.location.pathname;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" className="navbar-logo">
          BENFLIX
        </a>

        <div className="navbar-links">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className={`nav-link ${link.href === currentPath ? 'active' : ''}`}
              >
                <Icon size={16} />
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="user-actions">
          <button className="icon-button" aria-label="Notifications">
            <Bell size={18} />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
          <div className="user-avatar" aria-label="User Profile">
            JD
          </div>
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="navbar-logo">MovieHub</span>
          <button
            className="icon-button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-nav-links">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className={`nav-link ${link.href === currentPath ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={16} />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;