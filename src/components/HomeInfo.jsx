import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText = 'Open' }) => {
  return (
    <div className="info-box">
    <p className='font-medium sm:text-xl text-center'>{text}</p>
      <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow} className='w-4 h-4 object-contain'/>
      </Link>
    </div>
  )
}

const renderContent = {
  1:(
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Greetings! I'm <span className='font-semibold'>Nabil</span>👋
      <br />
      A Computer Engineering student
      <br />
      passionate about IoT and Web Development
    </h1>
  ),
  2:(
    <InfoBox 
      text="Let me share a bit about myself and what I'm focusing on as a growing Computer Engineering student."
      link="/about"
      btnText="Learn more"
    />
  ),
  3:(
    <InfoBox 
      text="You can explore the projects I’ve worked on as part of my learning journey in IoT, embedded systems, and software development."
      link="/projects"
      btnText="View projects"
    />
  ),
  4:(
    <InfoBox 
      text="If you would like to connect or discuss potential internship opportunities, you can reach me through the contact section below."
      link="/contact"
      btnText="Contact me"
    />
  ),
}

const HomeInfo = ( {currentStage} ) => {
  return renderContent[currentStage]  || null;
}

export default HomeInfo