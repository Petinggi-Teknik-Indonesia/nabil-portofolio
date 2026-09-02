import { skills, experiences } from '../constants';
import React, { useState } from 'react';
import ExperienceModal from '../components/ExperienceModal';
import CTA from '../components/CTA';

const About = () => {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <section className="max-container">
      <h1 className='head-text'>
        Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Nabil</span>
      </h1>
      
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p className='text-justify leading-relaxed'>
          A Computer Engineering student with hands-on experience in IoT, embedded systems, robotics, and web development.
          I have worked on hardware–software integration projects involving Arduino, ESP32, sensors, actuators, and embedded programming.
          I also have experience developing web-based applications and backend systems, allowing me to work across both hardware and software.
          My professional experience in educational robotics and product development has given me practical exposure to engineering, system integration, and technical problem-solving.
          I’m continuously expanding my skills across hardware and software while looking for opportunities to build practical and impactful technology solutions.
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div key={skill.name} className='block-container w-20 h-20'>
              <div className='btn-back rounded-xl'/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img 
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className='py-16'>
          <h3 className='subhead-text'>Experiences</h3>
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p className='text-justify leading-relaxed'>
              Explore my organizational experiences, leadership roles, and competition involvement throughout my studies.
              Each experience highlights the responsibilities and skills I developed along the way.
            </p>
        </div>

        <div className='mt-20 w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28'>
            {experiences.map((exp) => (
              <div key={exp.title} className='flex flex-col items-stretch'>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => { console.log('open experience (card)', exp?.title); setSelectedExp(exp); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedExp(exp); } }}
                  className='block-container w-72 min-h-48 p-5 flex flex-col justify-start items-start cursor-pointer'
                >
                  <div className='btn-back rounded-xl'/>
                  <div className='btn-front rounded-xl p-5 flex flex-col gap-3'>
                    {exp?.icon ? (
                      <img src={exp.icon} className='w-10 h-10 object-contain' alt={exp.company_name} />
                    ) : (
                      <div className='w-10 h-10 bg-white/20 rounded mb-2 flex items-center justify-center'>No</div>
                    )}

                    <h3 className='font-semibold text-lg text-slate-800'>
                      {exp.title}
                    </h3>
                    <p className='text-slate-500 text-sm'>
                      {exp.company_name}
                    </p>
                    <p className='text-slate-400 text-xs'>
                      {exp.date}
                    </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      <ExperienceModal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.title}
        company={selectedExp?.company_name}
        date={selectedExp?.date}
        points={selectedExp?.points}
      />

      <hr className='border-slate-200'/>
      
      <CTA />
        
    </section>
  )
}

export default About