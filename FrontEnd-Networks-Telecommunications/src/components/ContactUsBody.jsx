  import React from 'react'
  import "../styles/ContactUsBody.css";

  function ContactUsBody() {
    return (
    <div className="contactUsBody">

    <section className="contactUsHeader">
      <h1 className="contactUsTitle">Contact Us</h1>
      <p className="contactUsSubtitle">
        Monitoring and management platform for cameras and routers.
      </p>
    </section>

    <section className="contactUsSection">
      <h2 className="contactUssectionTitle">Platform Information</h2>
      <p className="contactUssectionText">
        This web platform allows centralized monitoring of telecommunications
        devices, including surveillance cameras and network routers, providing
        secure administration and real-time visualization.  
      </p>
    </section>

    <section className="contactUsSection">
      <h2 className="contactUssectionTitle">Objectives</h2>

      <ul className="contactUssectionList">
        <li>Monitor network devices in real time.</li>
        <li>Improve infrastructure management efficiency.</li>
        <li>Provide secure access to device information.</li>
        <li>Facilitate preventive maintenance and supervision.</li>
      </ul>
    </section>

    <section className="contactUsSection">
      <h2 className="contactUssectionTitle">Goals</h2>

      <ul className="contactUssectionList">
        <li>Maintain stable and secure connectivity.</li>
        <li>Reduce monitoring response times.</li>
        <li>Optimize telecommunications resources.</li>
        <li>Improve operational control of the infrastructure.</li>
      </ul>
    </section>

    <section className="contactUsSection">
      <h2 className="contactUssectionTitle">Contact Information</h2>

      <div className="contactUsInfoContainer">

        <div className="contactUsCard">
          <span className="contactUsLabel">Email</span>
          <span className="contactUsValue">support@networksystem.com</span>
        </div>

        <div className="contactUsCard">
          <span className="contactUsLabel">Phone</span>
          <span className="contactValue">+506 8888-8888</span>
        </div>

        <div className="contactUsCard">
          <span className="contactUsLabel">Location</span>
          <span className="contactUsValue">San José, Costa Rica</span>
        </div>

      </div>
    </section>

    <footer className="contactFooter">
      <span>
        Nerworks Telecommunications© 2026 - All rights reserved.
      </span>
    </footer>

  </div>
    )
  }

  export default ContactUsBody