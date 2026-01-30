"use client";

import { useEffect, useRef } from "react";

/**
 * useParallaxScroll - Adds fun parallax and dynamic effects on scroll
 * Elements with data-parallax attribute will move at different speeds
 * Elements with data-float will have floating animations
 */
export function useParallaxScroll() {
    const rafRef = useRef(null);

    useEffect(() => {
        const parallaxElements = document.querySelectorAll("[data-parallax]");
        const floatElements = document.querySelectorAll("[data-float]");

        // Add staggered floating animation to float elements
        floatElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.15}s`;
        });

        const handleScroll = () => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const viewportHeight = window.innerHeight;

                parallaxElements.forEach((el) => {
                    const rect = el.getBoundingClientRect();
                    const speed = parseFloat(el.dataset.parallax) || 0.1;
                    const inView = rect.top < viewportHeight && rect.bottom > 0;

                    if (inView) {
                        const yPos = (rect.top - viewportHeight / 2) * speed;
                        el.style.transform = `translateY(${yPos}px)`;
                    }
                });

                rafRef.current = null;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);
}

/**
 * Enhanced reveal with staggered animations and fun effects
 */
export function useFunReveal() {
    useEffect(() => {
        const sections = document.querySelectorAll(".section");
        const cards = document.querySelectorAll(".card");

        // Add stagger index to cards for cascading animation
        cards.forEach((card, index) => {
            card.style.setProperty("--stagger-delay", `${index * 0.08}s`);
        });

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");

                        // Add extra fun class for sections
                        if (entry.target.classList.contains("section")) {
                            entry.target.classList.add("section-visible");
                        }

                        io.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -5% 0px",
            }
        );

        sections.forEach((el) => io.observe(el));
        cards.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);
}
