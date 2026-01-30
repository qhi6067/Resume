"use client";

import { useState, useEffect } from "react";

/**
 * WelcomeOverlay
 * Full-screen welcome animation that displays a typewriter effect message
 * and fades out once complete.
 */
export function WelcomeOverlay({ onComplete }) {
  const fullMessage = "Jaime Perez. Tech. Healthcare. Strategy.";

  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullMessage.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // 50ms per character

      return () => clearTimeout(timeout);
    } else {
      // Message complete, wait a moment then fade out
      const completeTimeout = setTimeout(() => {
        setIsComplete(true);
        setIsFading(true);
      }, 1200);

      return () => clearTimeout(completeTimeout);
    }
  }, [currentIndex, fullMessage]);

  // Handle fade out completion
  useEffect(() => {
    if (isFading) {
      const fadeTimeout = setTimeout(() => {
        onComplete?.();
      }, 1000); // Match the CSS fade duration

      return () => clearTimeout(fadeTimeout);
    }
  }, [isFading, onComplete]);

  return (
    <div className={`welcome-overlay ${isFading ? "fade-out" : ""}`}>
      <div className="welcome-content">
        <div className="welcome-text-container">
          <h1 className="welcome-text">
            {displayedText}
            <span className={`cursor ${isComplete ? "hidden" : ""}`}>|</span>
          </h1>
        </div>

        {/* Decorative floating orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <style jsx>{`
        .welcome-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
            ellipse 120% 100% at 50% 0%,
            #0a1628 0%,
            #050a12 50%,
            #020408 100%
          );
          transition: opacity 1s ease, visibility 1s ease;
        }

        .welcome-overlay.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .welcome-content {
          position: relative;
          max-width: 900px;
          padding: 40px;
          text-align: center;
        }

        .welcome-text-container {
          position: relative;
          z-index: 2;
        }

        .welcome-text {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0.5px;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #8dd0ff 25%,
            #51e2f5 50%,
            #8dd0ff 75%,
            #ffffff 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 4s ease infinite;
          margin: 0;
          text-shadow: 0 0 60px rgba(81, 226, 245, 0.3);
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .cursor {
          display: inline-block;
          color: #51e2f5;
          font-weight: 300;
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }

        .cursor.hidden {
          opacity: 0;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        /* Decorative floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
          top: -100px;
          left: -50px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
          bottom: -80px;
          right: -30px;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        .orb-3 {
          animation: float-center 6s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes float-center {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, calc(-50% - 20px)) scale(1.05);
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .welcome-content {
            padding: 20px;
          }

          .orb {
            filter: blur(40px);
            opacity: 0.4;
          }

          .orb-1 {
            width: 150px;
            height: 150px;
          }

          .orb-2 {
            width: 120px;
            height: 120px;
          }

          .orb-3 {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}
