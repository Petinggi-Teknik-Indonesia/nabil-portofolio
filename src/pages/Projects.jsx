import React, { useState } from 'react'
import { projects } from '../constants'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'
import CTA from '../components/CTA'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="max-container">
      <h1 className='head-text'>
        My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span>
      </h1>
      
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p className='text-justify leading-relaxed'>
          A selection of my hands-on projects across IoT, embedded systems, and software development.
          These projects showcase my experience in hardware integration, programming, and building practical engineering solutions.
        </p>
      </div>

      <div className='flex flex-wrap my-20 gap-8'>
        {projects.map((project) => (
          <div
            className='lg:w-[400px] w-full h-[460px] bg-white border border-slate-200 rounded-2xl p-7 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
            key={project.name}
          >
            <div className='block-container w-12 h-12 shrink-0'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img 
                  src={project.iconUrl}
                  alt={`${project.name} icon`}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-6 flex flex-col flex-1 min-h-0'>
              <h4 className='text-2xl font-poppins font-semibold leading-snug line-clamp-2 min-h-[58px]'>
                {project.name}
              </h4>

              <div className='mt-3'>
                <p className='text-slate-500 text-justify leading-relaxed line-clamp-4'>
                  {project.description}
                </p>

                <button
                  type='button'
                  onClick={() => setSelectedProject(project)}
                  className='mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'
                >
                  Read more
                </button>
              </div>

              <div className='mt-5 flex flex-wrap gap-2'>
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className='px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm text-slate-600 text-xs font-medium font-poppins'
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className='mt-auto pt-6 flex items-center gap-2 font-poppins'>
                <Link
                  to={project.link}
                  target="_blank"
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700'
                >
                  View Repository
                </Link>

                <img 
                  src={arrow}
                  alt='arrow'
                  className='w-4 h-4 object-contain'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <hr className='border-slate-200'/>

      <CTA />

      {selectedProject && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm'
          onClick={() => setSelectedProject(null)}
        >
          <div
            className='w-full max-w-xl bg-white rounded-2xl p-7 shadow-xl border border-slate-200'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex items-start justify-between gap-5'>
              <div>
                <h3 className='text-2xl font-poppins font-semibold leading-snug'>
                  {selectedProject.name}
                </h3>

                <div className='mt-3 flex flex-wrap gap-2'>
                  {selectedProject.technologies.map((technology) => (
                    <span
                      key={technology}
                      className='px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium font-poppins'
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type='button'
                onClick={() => setSelectedProject(null)}
                className='shrink-0 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors duration-200 flex items-center justify-center text-lg'
                aria-label='Close project details'
              >
                ×
              </button>
            </div>

            <p className='mt-6 text-slate-600 text-justify leading-relaxed'>
              {selectedProject.description}
            </p>

            <div className='mt-7 flex justify-end'>
              <button
                type='button'
                onClick={() => setSelectedProject(null)}
                className='px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium font-poppins hover:bg-slate-200 transition-colors duration-200'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects