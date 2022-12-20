import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { AppWrapper, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import  ReactTooltip from 'react-tooltip'

// styles
import './Skills.scss'

const Skills = () => {
  const [experience, setExperience] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(query).then(data => setExperience(data))
    client.fetch(skillsQuery).then(data => setSkills(data))
  },[])
  
  return (
    <>
      <h2 className='head-text'>Skills & Experince</h2>

      <div className='app__skills-container'>
        <motion.div
          className='app__skills-list'
        >
          {skills?.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0,1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app_flex'
              key={index}
            >
              <div className='app__flex' style={{ background: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className='app__skills-exp'>
            {experience?.map((exp, index) => (
              <motion.div className='app__skills-exp-item' key={index}>
                <div className='app__skills-exp-year'>
                  <p className='bold-text'>{exp.year}</p>
                </div>
                <motion.div className='app__skills-exp-works'>
                  {exp.works.map((work, index) => (
                    <>
                      <motion.div
                        whileInView={{ opacity: [0,1] }}
                        transition={{ duration: 0.5 }}
                        className='app__skills-exp-work'
                        data-tip
                        data-for={work.name}
                        key={index}
                      >
                        <h4 className='bold-text'>{work.name}</h4>
                        <p className='p-text'>{work.company}</p>
                      </motion.div>
      
                      <ReactTooltip 
                        id={work.name}
                        effect="solid"
                        arrowColor="#fff"
                        className='skills-tooltip'
                      >
                        {work.desc}
                      </ReactTooltip>
                    </>
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrapper(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg')