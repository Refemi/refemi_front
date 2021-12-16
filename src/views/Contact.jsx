import React, { useState, useEffect } from 'react'
import '../css/contact.css'
import '../css/forms.css'

const Contact = () => {
  const [status, setStatus] = useState('Envoyer')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSend = async e => {
    e.preventDefault()
    setStatus('Envoi...')

    const details = {
      username,
      email,
      message
    }

    const response = await fetch('http://localhost:8000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/jsoncharset=utf-8' },
      body: JSON.stringify(details)
    })

    const result = await response.json()
    setStatus('Envoyer')
    alert(result.status)
    setUsername('')
    setEmail('')
    setMessage('')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-column align-center margin-top20">
      <p>Des remarques, des suggestions d&apos;améliorations, des questions ?</p>
      <p>Contactez-nous !</p>

      <form
        className="borders flex flex-column align-center width80"
        onSubmit={handleSend}
      >
        <div className="margin-input flex flex-column width80">
          <label htmlFor="username">Nom</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={ e => setUsername(e.target.value) }
            className="form-input"
            required
          />
        </div>

        <div className="margin-input flex flex-column width80">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={ e => setEmail(e.target.value) }
            className="form-input"
            required
          />
        </div>

        <div className="margin-input flex flex-column width80">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="10"
            col="30"
            onChange={ e => setMessage(e.target.value) }
            value={message}
            className="form-input"
            required
          />
        </div>

        <button
          className="margin-bottom20 darkblue-bg text-white send-btn pointer"
          type="submit"
        >
          {status}
        </button>
      </form>
    </div>
  )
}

export default Contact
