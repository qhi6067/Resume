"use client";

import { useState, useEffect } from "react";

/**
 * WelcomeOverlay
 *
 * Premium intro screen with:
 * - Dot-grid background (matches site texture)
 * - Typewriter text effect
 * - Gradient animated text
 * - Floating orbs
 * - Smooth fade-out
 */
export function WelcomeOverlay({ onComplete }) {
  const fullMessage = "Jaime Perez.\nTech · Healthcare · Strategy.";

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const t = setTimeout(() => {
        setDisplayedText(fullMessage.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setIsComplete(true);
        setIsFading(true);
      }, 1100);
      return () => clearTimeout(t);
    }
  }, [currentIndex, fullMessage]);

  useEffect(() => {
    if (!isFading) return;
    const t = setTimeout(() => onComplete?.(), 950);
    return () => clearTimeout(t);
  }, [isFading, onComplete]);

  const renderWithBreaks = (text) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  return (
    <div className={`wov ${isFading ? "wov-out" : ""}`}>
      {/* Dot grid */}
      <div className="wov-grid" />

      <div className="wov-content">
        {/* Orbs */}
        <div className="wov-orb orb-a" />
        <div className="wov-orb orb-b" />
        <div className="wov-orb orb-c" />

        <div className="wov-text-wrap">
          {/* Small label above */}
          <div className="wov-label">PORTFOLIO · 2025</div>

          <h1 className="wov-text">
            {renderWithBreaks(displayedText)}
            <span className={`wov-cursor ${isComplete ? "wov-cursor-hidden" : ""}`}>|</span>
          </h1>
        </div>
      </div>

      <style jsx>{`
        .wov {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
            ellipse 140% 90% at 50% 0%,
            #08192e 0%,
            #030912 50%,
            #010508 100%
          );
          transition: opacity 0.95s ease, visibility 0.95s ease;
        }

        .wov.wov-out {
          opacity: 0;
          visibility: hidden;
        }

        /* Dot grid overlay */
        .wov-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0, 212, 240, 0.09) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          opacity: 0.4;
        }

        .wov-content {
          position: relative;
          max-width: 860px;
          padding: 40px;
          text-align: left;
          width: 100%;
        }

        .wov-text-wrap {
          position: relative;
          z-index: 2;
        }

        .wov-label {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          color: #4e6e85;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .wov-text {
          font-size: clamp(30px, 5.5vw, 58px);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -1px;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #8dd0ff 25%,
            #00d4f0 50%,
            #9d6fff 80%,
            #ffffff 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wov-grad 5s ease infinite;
          margin: 0;
        }

        @keyframes wov-grad {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }

        .wov-cursor {
          display: inline-block;
          color: #00d4f0;
          font-weight: 200;
          margin-left: 2px;
          animation: wov-blink 0.75s infinite;
          -webkit-text-fill-color: #00d4f0;
        }

        .wov-cursor.wov-cursor-hidden {
          opacity: 0;
        }

        @keyframes wov-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Orbs */
        .wov-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: wov-float 7s ease-in-out infinite;
        }

        .orb-a {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 212, 240, 0.18) 0%, transparent 70%);
          top: -160px;
          left: -80px;
          animation-delay: 0s;
        }

        .orb-b {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(157, 111, 255, 0.14) 0%, transparent 70%);
          bottom: -120px;
          right: -40px;
          animation-delay: 2.5s;
        }

        .orb-c {
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(0, 226, 160, 0.09) 0%, transparent 70%);
          top: 40%;
          left: 55%;
          animation-delay: 5s;
        }

        @keyframes wov-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-22px) scale(1.04); }
        }

        @media (max-width: 768px) {
          .wov-content { padding: 24px; }
          .wov-text { letter-spacing: -0.5px; }
          .orb-a { width: 200px; height: 200px; }
          .orb-b { width: 160px; height: 160px; }
          .orb-c { width: 120px; height: 120px; }
        }
      `}</style>
    </div>
  );
}
