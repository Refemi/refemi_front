import React, { useState } from "react";

import translationKeys from "../utils/translationKeys.json";

export default function Contact() {
  const frenchKeys = translationKeys[0].french;

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
      headers: {
        "Content-Type": "application/jsoncharset=utf-8",
        Accept: "application/jsoncharset=utf-8",
      },
      body: JSON.stringify(details),
    });

    const result = await response.json();
    setStatus("Envoyer");
    alert(result.status);
    setUsername("");
    setEmail("");
    setMessage("");
  };

  return (
    <main className="is-flex is-flex-direction-column is-align-items-center">
      <h2 className="mt-6 has-text-centered mx-3 has-text-weight-bold">
        {frenchKeys.suggestionsOrQuestions}
        <span className="refemi">refemi</span> ?
      </h2>
      <p>{frenchKeys.contactUs}</p>

      <form
        className="borders is-flex is-flex-direction-column is-align-items-center"
        onSubmit={handleSend}
      >
        <fieldset className="is-flex is-flex-direction-column">
          <label htmlFor="username">{frenchKeys.userName}</label>
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
          <label htmlFor="email">{frenchKeys.userEmail}</label>
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
          <label htmlFor="message">{frenchKeys.message}</label>
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
