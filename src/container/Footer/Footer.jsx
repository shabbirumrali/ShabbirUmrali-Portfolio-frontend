import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrapper, MotionWrap } from '../../wrapper'
import { client } from '../../client'

// styles
import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: email,
      message: message
    }

    client.create(contact).then(() => {
      setLoading(false)
      setIsFormSubmitted(true)
    })
  }
  
  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} />
          <a href='mailto:shabbirumrali@gmai.com' className='p-text'>shabbirumrali@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} />
          <a href='tel:+917354060769' className='p-text'>+91 7354060769</a>
        </div>
      </div>
    
    { !isFormSubmitted ? (
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className='p-text' type='text' placeholder='Your Name' value={name} onChange={handleChangeInput} name='name' />
        </div>
        <div className='app__flex'>
          <input className='p-text' type='email' placeholder='Your Email' value={email} onChange={handleChangeInput} name='email' />
        </div>
        <div>
          <textarea className='p-text' placeholder='your message' value={message} onChange={handleChangeInput} name='message' ></textarea>
        </div>
        <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending...' : 'Send Message'}</button>
      </div>
    ) : (
      <div>
        <h2 className='head-text'>Thank you for getting in touch!</h2>
      </div>
    )
    }
    </>
  )
}

export default AppWrapper(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')