import React, { useEffect, useRef, useState } from 'react'
import { projects } from '../constants'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'
import CTA from '../components/CTA'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!selectedProject) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [selectedProject])

  const categories = ['All', 'IoT & Robotics', 'Web Development']
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="max-container">
      <h1 className='head-text'>
        My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span>
      </h1>
      
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p className='text-justify leading-relaxed'>
          Explore my IoT, robotics, embedded systems, and web projects. Each highlights the technologies, practical challenges, and contributions behind the solution. Filter by category, read more, or visit a repository.
        </p>
      </div>

      <div className='mt-8 flex flex-wrap gap-3' aria-label='Filter projects by category'>
        {categories.map((category) => (
          <button
            key={category}
            type='button'
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='my-12 grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {filteredProjects.map((project) => (
          <div
            className='min-h-[420px] md:min-h-[460px] bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
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
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget
                    setSelectedProject(project)
                  }}
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
          className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm'
          onClick={() => setSelectedProject(null)}
        >
          <div
            className='w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-slate-200'
            onClick={(event) => event.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby='project-dialog-title'
          >
            <div className='flex items-start justify-between gap-5'>
              <div>
                <h3 id='project-dialog-title' className='text-2xl font-poppins font-semibold leading-snug'>
                  {selectedProject.name}
                </h3>

                <span className='mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
                  {selectedProject.category}
                </span>

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
                ref={closeButtonRef}
                className='shrink-0 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors duration-200 flex items-center justify-center text-lg'
                aria-label='Close project details'
              >
                &times;
              </button>
            </div>

            <p className='mt-6 text-slate-600 text-justify leading-relaxed'>
              {selectedProject.description}
            </p>

            <div className='mt-7 flex flex-wrap justify-end gap-3'>
              <a
                href={selectedProject.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
              >
                View Repository
              </a>
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
