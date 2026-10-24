import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText = 'Open' }) => {
  return (
    <div className="info-box">
      <p className='font-medium sm:text-xl text-center'>
        {text}
      </p>

      <Link 
        to={link} 
        className='neo-brutalism-white neo-btn'
      >
        {btnText}

        <img 
          src={arrow}
          alt='arrow'
          className='w-4 h-4 object-contain'
        />
      </Link>
    </div>
  )
}

const renderContent = {
  1: (
    <h1 className='text-base sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-6 sm:px-8 text-white mx-5'>
      <b>Hi, I'm</b> <span className='font-semibold'>Nabil</span>
      <br />
      A Computer Engineering student at Universitas Multimedia Nusantara
      <br />
      building practical solutions across software, IoT, and embedded systems
    </h1>
  ),

  2: (
    <InfoBox
      text="My experience spans web application development, IoT product work, and teaching programming. Explore the skills and experiences behind my work across software and hardware."
      link="/about"
      btnText="About Me"
    />
  ),

  3: (
    <InfoBox
      text="From educational robots and embedded prototypes to web interfaces, these projects show how I approach practical engineering challenges and build useful solutions."
      link="/projects"
      btnText="View Projects"
    />
  ),

  4: (
    <InfoBox
      text="Interested in an internship, collaboration, or a technical conversation? I'd be glad to connect and hear what you're working on."
      link="/contact"
      btnText="Get in Touch"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
