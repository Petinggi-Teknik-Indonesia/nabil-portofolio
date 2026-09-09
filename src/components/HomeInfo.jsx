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
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      <b>Greetings!</b> I'm <span className='font-semibold'>Nabil</span> 👋
      <br />
      A Computer Engineering student
      <br />
      passionate about IoT and Web Development
    </h1>
  ),

  2: (
    <InfoBox
      text="Curious about my background and what I do? Explore my experience, technical interests, and the skills I've developed through hands-on projects."
      link="/about"
      btnText="Explore About"
    />
  ),

  3: (
    <InfoBox
      text="Take a look at the projects I've built across IoT, embedded systems, robotics, and web development, from small experiments to practical engineering solutions."
      link="/projects"
      btnText="Explore Projects"
    />
  ),

  4: (
    <InfoBox
      text="Have an opportunity, project idea, or just want to connect? Feel free to reach out and let's start a conversation."
      link="/contact"
      btnText="Get in Touch"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo