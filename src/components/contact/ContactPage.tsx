"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { FOOTER_LINKS } from "@/lib/constants";
import { CONTACT_BUDGETS } from "@/lib/pages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage() {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [budgets, setBudgets] = useState<string[]>([]);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

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
    { scope: sectionRef }
  );

  const goToNext = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
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
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not specified"}\n\n${message}\n\nBudget: ${budgets.join(", ") || "Not specified"}`
    );
    window.location.href = `mailto:${FOOTER_LINKS.email}?subject=${subject}&body=${body}`;
    setPage(3);
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
                href="https://wa.me/6281234567890?text=START%20CHAT%0ATap%20send%20to%20initiate%20the%20conversation."
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat in Whatsapp
              </a>
            </div>
          </div>
          <div className="line-break" />
        </div>

        <div className="contact-form-wrapper">
          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {page === 1 ? (
              <div className="page-1-wrapper">
                <label className="text-medium">
                  Let&apos;s start a conversation
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Company name (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="button-wrapper">
                  <button className="next-step" onClick={goToNext}>
                    Next step
                  </button>
                  {error && (
                    <span className="error-message text-small">{error}</span>
                  )}
                </div>
              </div>
            ) : page === 2 ? (
              <div className="page-2-wrapper">
                <button
                  className="back-btn"
                  onClick={() => setPage(1)}
                >
                  Back
                </button>
                <div className="input-wrapper">
                  <textarea
                    placeholder="Tell me about your project"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="budgets">
                    <div className="budget-title">Select budget range</div>
                    <div className="check-container">
                      {CONTACT_BUDGETS.map((budget) => (
                        <label key={budget} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={budgets.includes(budget)}
                            onChange={() => toggleBudget(budget)}
                          />
                          <span className="checkbox-text">{budget}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="send-request" onClick={sendRequest}>
                  Send request
                </button>
              </div>
            ) : (
              <div className="page-3-wrapper">
                <span className="success-message">
                  Thanks for reaching out! I&apos;ll get back to you shortly.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
