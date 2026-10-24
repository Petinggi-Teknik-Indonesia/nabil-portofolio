import { skills, experiences } from '../constants';
import React, { useEffect, useRef, useState } from 'react';
import ExperienceModal from '../components/ExperienceModal';
import CTA from '../components/CTA';

const About = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [activeSkillTooltip, setActiveSkillTooltip] = useState(null);
  const skillTooltipTimer = useRef(null);

  useEffect(() => () => clearTimeout(skillTooltipTimer.current), []);

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Nabil</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p className="text-justify leading-relaxed">
          Computer Engineering student at Universitas Multimedia Nusantara with experience in web applications, backend systems, and IoT. Currently developing internal applications at PT Summarecon Agung Tbk using PHP, Laravel, API integration, and PostgreSQL. Previously built embedded and robotics solutions through hardware integration and teamwork.
        </p>
      </div>

      <div className="mt-12 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-5 sm:flex sm:flex-wrap sm:gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="group relative h-16 w-16">
              <button
                type="button"
                aria-label={skill.name}
                aria-expanded={activeSkillTooltip === skill.name}
                onClick={(event) => {
                  event.preventDefault();
                  clearTimeout(skillTooltipTimer.current);
                  setActiveSkillTooltip(skill.name);
                  skillTooltipTimer.current = setTimeout(() => {
                    setActiveSkillTooltip((activeSkill) => activeSkill === skill.name ? null : activeSkill);
                  }, 1500);
                }}
                className="block-container skill-card group relative h-16 w-16 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span className="btn-back rounded-xl" />
                <span className="btn-front rounded-xl border border-slate-200/80 flex justify-center items-center shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md">
                  <img
                    src={skill.imageUrl}
                    alt=""
                    className="w-1/2 h-1/2 object-contain"
                  />
                </span>
              </button>
              <span
                role="tooltip"
                aria-hidden={activeSkillTooltip !== skill.name}
                className={`skill-tooltip pointer-events-none absolute -top-3 right-0 z-30 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-md transition-opacity duration-150 ${
                  activeSkillTooltip === skill.name
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="subhead-text">Experiences</h3>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p className="text-justify leading-relaxed">
            Explore my experience across software development, IoT and robotics, teaching, and campus leadership. These roles show how I solve practical problems, collaborate with different teams, and turn ideas into useful outcomes. Open a card for details about my responsibilities and contributions.
          </p>
        </div>

        <div className="mt-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div key={exp.title} className="flex flex-col items-stretch">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`View details for ${exp.title} at ${exp.company_name}`}
                  onClick={() => setSelectedExp(exp)}
                  className="block-container experience-card group h-60 w-full p-5 flex flex-col justify-start items-start text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <div className="btn-back rounded-xl" />

                  <div className="btn-front rounded-xl border border-slate-200/80 p-5 flex flex-col gap-3 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md">
                    {exp?.icon ? (
                      <img
                        src={exp.icon}
                        className="w-10 h-10 object-contain"
                        alt={exp.company_name}
                      />
                    ) : null}

                    <h3 className="font-semibold text-lg text-slate-800">
                      {exp.title}
                    </h3>

                    <p className="text-slate-500 text-sm">
                      {exp.company_name}
                    </p>

                    <p className="text-slate-400 text-xs">
                      {exp.date}
                    </p>

                    <span className="mt-auto flex items-center gap-1 text-sm font-medium text-blue-600">
                      View details <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </button>
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

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default About;

