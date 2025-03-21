import React, { useRef, useState } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { Send, MapPin, Mail } from 'lucide-react'

const Contact = () => {
  const scrollRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const validateForm = () => {
    const tempErrors = {}
    let isValid = true

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid'
      isValid = false
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required'
      isValid = false
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required'
      isValid = false
    }

    setErrors(tempErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setStatus('Please fill in all required fields correctly.')
      return
    }

    // Create a new FormData object to send to Web3Forms API
    const form = new FormData()
    form.append('access_key', '44b28ec2-e0a1-459a-8e3b-06869186889b')
    form.append('name', formData.name)
    form.append('email', formData.email)
    form.append('subject', formData.subject || 'New Contact Form Submission')
    form.append('message', formData.message)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setErrors({})
      } else {
        setStatus(result.message || 'There was an error sending your message.')
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.')
      console.error('Error:', error)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <FixTabPanel>
      <div className='code-window relative h-full w-[50%]'>
        <h2 className='mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold text-transparent'>
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                className={`w-full rounded-xl border px-4 py-3 ${
                  errors.name ? 'border-red-500' : 'border-gray-300/50 bg-white/30'
                } backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name}</p>}
            </div>

            <div>
              <input
                type='email'
                name='email'
                placeholder='Your Email'
                className={`w-full rounded-xl border px-4 py-3 ${
                  errors.email ? 'border-red-500' : 'border-gray-300/50 bg-white/30 text-gray-800'
                } backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
            </div>

            <div>
              <input
                type='text'
                name='subject'
                placeholder='Subject'
                className={`w-full rounded-xl border px-4 py-3 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300/50 bg-white/30 text-gray-800'
                } backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none`}
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && <p className='mt-1 text-sm text-red-500'>{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name='message'
                placeholder='Your Message'
                rows={4}
                className={`w-full resize-none rounded-xl border px-4 py-3 ${
                  errors.message ? 'border-red-500' : 'border-gray-300/50 bg-white/30 text-gray-800'
                } backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none`}
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className='mt-1 text-sm text-red-500'>{errors.message}</p>}
            </div>
          </div>

          <button
            type='submit'
            className='flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
          >
            <span>Send Message</span>
            <Send className='h-4 w-4' />
          </button>
        </form>

        {status && (
          <div
            className={`mt-4 rounded-lg p-3 backdrop-blur-sm ${
              status.includes('success')
                ? 'border border-green-500/20 bg-green-500/10 text-green-400'
                : 'border border-red-500/20 bg-red-500/10 text-red-400'
            }`}
          >
            <p className='text-center'>{status}</p>
          </div>
        )}
      </div>
    </FixTabPanel>
  )
}

export default Contact
