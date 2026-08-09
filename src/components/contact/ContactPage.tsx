"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { FOOTER_LINKS } from "@/lib/constants";
import { CONTACT_BUDGETS } from "@/lib/pages";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntroReady } from "@/lib/intro";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type ErrorField = "name" | "email" | "message" | null;

export function ContactPage() {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [budgets, setBudgets] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);
  const [mailtoHref, setMailtoHref] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const introReady = useIntroReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !introReady || prefersReducedMotion()) return;

      const title = section.querySelector(".title h1");
      if (title) {
        const chars = SplitText.create(title, { type: "chars" }).chars;
        gsap.set(chars, { yPercent: 100 });
        gsap.to(chars, {
          yPercent: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      gsap.fromTo(
        section.querySelectorAll(".link-wrapper"),
        { y: "100%" },
        { y: "0%", duration: 0.9, stagger: 0.1, ease: "power4.out", delay: 0.6 }
      );
      gsap.fromTo(
        section.querySelector(".contact-form"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.9 }
      );
    },
    { scope: sectionRef, dependencies: [introReady], revertOnUpdate: true }
  );

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (page === 1) nameRef.current?.focus();
      if (page === 2) messageRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [page]);

  const setValidationError = (
    field: ErrorField,
    messageText: string
  ) => {
    setErrorField(field);
    setError(messageText);
  };

  const clearFieldError = (field: ErrorField) => {
    if (errorField !== field) return;
    setErrorField(null);
    setError("");
  };

  const goToNext = () => {
    if (!name.trim()) {
      setValidationError("name", "Please enter your name");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setValidationError("email", "Please enter a valid email address");
      return;
    }
    setError("");
    setErrorField(null);
    setPage(2);
  };

  const toggleBudget = (budget: string) => {
    setBudgets((prev) =>
      prev.includes(budget)
        ? prev.filter((b) => b !== budget)
        : [...prev, budget]
    );
  };

  const sendRequest = () => {
    if (!message.trim()) {
      setValidationError("message", "Tell me what you are building");
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nCompany: ${company.trim() || "Not specified"}\n\n${message.trim()}\n\nBudget: ${budgets.join(", ") || "Not specified"}`
    );
    const href = `mailto:${FOOTER_LINKS.email}?subject=${subject}&body=${body}`;
    setMailtoHref(href);
    setError("");
    setErrorField(null);
    setPage(3);
    window.location.assign(href);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === 1) goToNext();
    if (page === 2) sendRequest();
  };

  return (
    <section ref={sectionRef} className="get-in-touch-section">
      <div className="container">
        <div className="header-wrapper">
          <div className="title">
            <h1>Get in touch</h1>
          </div>
          <div className="contact-links">
            <div className="link-wrapper">
              <a
                className="email text-medium"
                href={`mailto:${FOOTER_LINKS.email}`}
              >
                {FOOTER_LINKS.email}
              </a>
            </div>
            <div className="link-wrapper">
              <a
                className="whatsapp text-medium"
                href={`https://wa.me/${FOOTER_LINKS.whatsappNumber}?text=${encodeURIComponent("Hi Rifqi, I would like to discuss a project.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="line-break" />
        </div>

        <div className="contact-form-wrapper">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
          >
            <h2 id="contact-form-title" className="sr-only">
              Project inquiry
            </h2>
            {page === 1 ? (
              <div className="page-1-wrapper">
                <p className="text-medium">
                  Start with the problem
                </p>
                <div className="input-wrapper">
                  <label className="sr-only" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    aria-invalid={errorField === "name"}
                    aria-describedby={
                      error && errorField === "name"
                        ? "contact-error"
                        : undefined
                    }
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearFieldError("name");
                    }}
                  />
                </div>
                <div className="input-wrapper">
                  <label className="sr-only" htmlFor="contact-email">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                    aria-invalid={errorField === "email"}
                    aria-describedby={
                      error && errorField === "email"
                        ? "contact-error"
                        : undefined
                    }
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                  />
                </div>
                <div className="input-wrapper">
                  <label className="sr-only" htmlFor="contact-company">
                    Company or project name
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Company or project name (optional)"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="button-wrapper">
                  <button type="submit" className="next-step">
                    Next step
                  </button>
                  {error && (
                    <p id="contact-error" className="error-message text-small" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            ) : page === 2 ? (
              <div className="page-2-wrapper">
                <button
                  className="back-btn"
                  type="button"
                  onClick={() => setPage(1)}
                >
                  Back
                </button>
                <div className="input-wrapper">
                  <label className="sr-only" htmlFor="contact-message">
                    Project details
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    placeholder="What are you building, and where do you need help?"
                    rows={4}
                    required
                    aria-invalid={errorField === "message"}
                    aria-describedby={
                      error && errorField === "message"
                        ? "contact-error"
                        : undefined
                    }
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearFieldError("message");
                    }}
                  />
                  <fieldset className="budgets">
                    <legend className="budget-title">Approximate budget (USD)</legend>
                    <div className="check-container">
                      {CONTACT_BUDGETS.map((budget, index) => (
                        <label key={budget} className="checkbox-label" htmlFor={`budget-${index}`}>
                          <input
                            id={`budget-${index}`}
                            name="budget"
                            value={budget}
                            type="checkbox"
                            checked={budgets.includes(budget)}
                            onChange={() => toggleBudget(budget)}
                          />
                          <span className="checkbox-text">{budget}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {error && (
                    <p id="contact-error" className="error-message text-small" role="alert">
                      {error}
                    </p>
                  )}
                </div>
                <button type="submit" className="send-request">
                  Open email draft
                </button>
              </div>
            ) : (
              <div className="page-3-wrapper">
                <p className="success-message" role="status" aria-live="polite">
                  Your email draft is ready. Send it to complete your inquiry.
                </p>
                {mailtoHref && (
                  <a className="success-link text-small" href={mailtoHref}>
                    Open email draft again
                  </a>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
