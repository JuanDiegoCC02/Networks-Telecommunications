import React from 'react'

function HomeBody() {
  return (
    <div className='HomeContainer'>

  
      <section className='HeroSection'>
        <div className='HeroContent'>
          <h1 className='MainTitle'>
            Network & Telecommunications Monitoring Platform
          </h1>

          <h3 className='SubTitle'>
            Professional management and monitoring system for cameras,
            routers and telecommunications infrastructure.
          </h3>

          <p className='HeroDescription'>
            This platform allows technicians and administrators to register,
            organize and monitor network devices in real time. Users can
            visualize routers and cameras through interactive cards and maps,
            maintain technical records, verify operational status and improve
            infrastructure control inside telecommunications environments.
          </p>
        </div>
      </section>

  
      <section className='InformationSection'>

        <div className='InfoCard'>
          <h2 className='CardTitle'>Platform Objectives</h2>

          <ul className='InfoList'>
            <li>
              Register and organize telecommunications devices efficiently.
            </li>

            <li>
              Monitor routers and cameras from a centralized system.
            </li>

            <li>
              Improve technical management and infrastructure visibility.
            </li>

            <li>
              Provide real-time operational control for technicians.
            </li>

            <li>
              Facilitate maintenance and troubleshooting processes.
            </li>
          </ul>
        </div>

        <div className='InfoCard'>
          <h2 className='CardTitle'>Main Features</h2>

          <ul className='InfoList'>
            <li>
              Device registration with technical information and location data.
            </li>

            <li>
              Interactive visualization using maps and information cards.
            </li>

            <li>
              Monitoring of device operational status.
            </li>

            <li>
              Secure user authentication and role management.
            </li>

            <li>
              Structured database management for telecommunications assets.
            </li>
          </ul>
        </div>

      </section>


      <section className='SystemSection'>

        <div className='SystemImageContainer'>
          <div className='FakeImage'>
            <p>Network Infrastructure Visualization</p>
          </div>
        </div>

        <div className='SystemDescription'>
          <h2 className='SystemTitle'>
            Centralized Infrastructure Supervision
          </h2>

          <p className='SystemText'>
            The system is designed to help telecommunications teams maintain
            complete control over distributed network equipment. Through a
            modern interface, administrators can access organized technical
            information, monitor equipment conditions and maintain updated
            infrastructure records.
          </p>

          <p className='SystemText'>
            The platform combines device administration, geolocation,
            operational monitoring and data organization into a single
            environment optimized for professional network management.
          </p>
        </div>

      </section>

  
      <section className='ExtraSection'>

        <div className='ExtraCard'>
          <h3 className='ExtraTitle'>Real-Time Monitoring</h3>

          <p className='ExtraText'>
            Monitor the operational status of routers and cameras continuously
            to detect failures and maintain infrastructure stability.
          </p>
        </div>

        <div className='ExtraCard'>
          <h3 className='ExtraTitle'>Geolocation System</h3>

          <p className='ExtraText'>
            Visualize devices directly on interactive maps to simplify
            infrastructure tracking and field operations.
          </p>
        </div>

        <div className='ExtraCard'>
          <h3 className='ExtraTitle'>Technical Administration</h3>

          <p className='ExtraText'>
            Store organized information including IP addresses, locations,
            device descriptions and operational data for efficient management.
          </p>
        </div>

      </section>

    </div>
  )
}

export default HomeBody