import React from 'react'
import "../styles/HomeBody.css";

function HomeBody() {
  return (
    <main className='HomeContainer'>

      {/* homeHero section */}
      <section className='HomeHeroSection'>

        <div className='HomeOverlay'></div>

        <video
          className='HomeBackgroundVideo'
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/cam1_trafic.mp4" type="video/mp4" />
        </video>

        <div className='HomeHeroContent'>

          <span className='HomeTag'>
            Telecommunications Infrastructure Platform
          </span>

          <h1 className='HomeMainTitle'>
            Smart Monitoring & Management for Network Infrastructure
          </h1>

          <p className='HomeHeroDescription'>
            Centralized platform designed for telecommunications technicians
            and administrators to monitor, register and manage routers,
            surveillance cameras and network infrastructure in real time.
          </p>

          <div className='HomeHeroStats'>

            <div className='HomeStatCard'>
              <h2>24/7</h2>
              <p>Infrastructure Monitoring</p>
            </div>

            <div className='HomeStatCard'>
              <h2>Real-Time</h2>
              <p>Device Status Tracking</p>
            </div>

            <div className='HomeStatCard'>
              <h2>Maps</h2>
              <p>Geolocation Visualization</p>
            </div>

          </div>

        </div>

      </section>

      {/* about section */}
      <section className='HomeAboutSection'>

        <div className='HomeAboutLeft'>

          <span className='HomeSectionTag'>
            SYSTEM OVERVIEW
          </span>

          <h2 className='HomeSectionTitle'>
            Professional Telecommunications Administration Environment
          </h2>

          <p className='HomeSectionText'>
            This system provides a modern environment for organizing and
            supervising network devices used inside telecommunications
            infrastructures. Technicians can register routers and cameras,
            monitor operational conditions and maintain detailed technical
            records from a centralized platform.
          </p>

          <p className='HomeSectionText'>
            The application integrates geolocation services, technical
            management panels, infrastructure visualization and operational
            monitoring tools to simplify network administration processes.
          </p>

        </div>

        <div className='HomeAboutRight'>

          <div className='HomeFeatureCard'>
            <h3>Infrastructure Registration</h3>
            <p>
              Store technical information such as IP addresses,
              MAC addresses, locations and operational descriptions.
            </p>
          </div>

          <div className='HomeFeatureCard'>
            <h3>Interactive Geolocation</h3>
            <p>
              Visualize routers and cameras directly on maps
              for better infrastructure control and field operations.
            </p>
          </div>

          <div className='HomeFeatureCard'>
            <h3>Operational Monitoring</h3>
            <p>
              Track the status of devices in real time and
              maintain infrastructure stability efficiently.
            </p>
          </div>

          <div className='HomeFeatureCard'>
            <h3>Technical Administration</h3>
            <p>
              Manage telecommunications assets from a unified
              administrative dashboard.
            </p>
          </div>

        </div>

      </section>

      {/* services section */}
      <section className='HomeServicesSection'>

        <div className='HomeServicesHeader'>

          <span className='HomeSectionTag'>
            CORE FUNCTIONS
          </span>

          <h2 className='HomeSectionTitle'>
            Main Platform Capabilities
          </h2>

        </div>

        <div className='HomeServicesGrid'>

          <div className='HomeServiceCard'>
            <div className='HomeServiceNumber'>01</div>

            <h3 className='HomeServiceTitle'>
              Router Administration
            </h3>

            <p className='HomeServiceText'>
              Register and monitor routers including
              status, location, IP configuration and
              technical information.
            </p>
          </div>

          <div className='HomeServiceCard'>
            <div className='HomeServiceNumber'>02</div>

            <h3 className='HomeServiceTitle'>
              Camera Supervision
            </h3>

            <p className='HomeServiceText'>
              Maintain visual surveillance systems organized
              through centralized technical management tools.
            </p>
          </div>

          <div className='HomeServiceCard'>
            <div className='HomeServiceNumber'>03</div>

            <h3 className='HomeServiceTitle'>
              Geolocation Mapping
            </h3>

            <p className='HomeServiceText'>
              Locate devices using interactive maps to
              improve infrastructure visibility and maintenance.
            </p>
          </div>

          <div className='HomeServiceCard'>
            <div className='HomeServiceNumber'>04</div>

            <h3 className='HomeServiceTitle'>
              Data Organization
            </h3>

            <p className='HomeServiceText'>
              Store structured technical information
              securely inside the database environment.
            </p>
          </div>

        </div>

      </section>

      {/* professional section */}
      <section className='HomeProfessionalSection'>

        <div className='HomeProfessionalContent'>

          <span className='HomeSectionTag'>
            NETWORK CONTROL CENTER
          </span>

          <h2 className='HomeSectionTitle'>
            Designed for Real Telecommunications Operations
          </h2>

          <p className='HomeSectionText'>
            The platform structure is inspired by modern
            telecommunications administration systems used
            for infrastructure supervision, operational control
            and technical monitoring.
          </p>

          <div className='HomeProfessionalList'>

            <div className='HomeProfessionalItem'>
              <span>✔</span>
              <p>Centralized device management</p>
            </div>

            <div className='HomeProfessionalItem'>
              <span>✔</span>
              <p>Real-time infrastructure supervision</p>
            </div>

            <div className='HomeProfessionalItem'>
              <span>✔</span>
              <p>Interactive map visualization</p>
            </div>

            <div className='HomeProfessionalItem'>
              <span>✔</span>
              <p>Professional technical organization</p>
            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default HomeBody