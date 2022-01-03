import React, { useState, useEffect } from "react";

export default function Contact() {
  const [status, setStatus] = useState("Envoyer");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("Envoi...");

    const details = {
      username,
      email,
      message,
    };

    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/jsoncharset=utf-8" },
      body: JSON.stringify(details),
    });

    const result = await response.json();
    setStatus("Envoyer");
    alert(result.status);
    setUsername("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-centered mx-3">
        Des remarques, des suggestions d&apos;améliorations, des questions sur{" "}
        <span className="refemi">refemi</span> ?
      </h2>
      <p>Contactez-nous !</p>

      <form
        className="borders is-flex is-flex-direction-column is-align-items-center"
        onSubmit={handleSend}
      >
        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="username">Nom</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </fieldset>

        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="10"
            col="30"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="form-input"
            required
          />
        </fieldset>

        <button
          className="darkblue-bg has-text-white send-btn pointer mt-6"
          type="submit"
        >
          {status}
        </button>
      </form>
    </main>
  );
}
