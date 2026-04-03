import React from 'react';
import '../styles/FooterPage.css';

function FooterPage() {
  return (
    <footer className='footerContainerFull'>
      <div className='footerContentGrid'>
        
        {/* Column 1: Public information */}
        <div className='footerSection'>
          <h3 className='footerLogoTitle'>NET<span>WORKS</span></h3>
          <p className='footerTagline'>Advanced Management System for Cameras and Routers.</p>
        </div>

        {/* Column 2: Access flash */}
        <div className='footerSection'>
          <h4 className='footerSubTitle'>Platform</h4>
          <ul className='footerLinks'>
            <li><a href="#access">System Access</a></li>
            <li><a href="#terms">Terms and Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className='footerSection'>
          <h4 className='footerSubTitle'>Support</h4>
          <p className='footerContactText'>Contact Us</p>
          <span className='footerAccessLink'>Support Portal</span>
        </div>

      </div>

      <div className='footerBottomBar'>
        <p>&copy; {new Date().getFullYear()} Juan Diego Corella Camacho. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default FooterPage;