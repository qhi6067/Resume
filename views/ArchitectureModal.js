"use client";

import { useEffect, useRef, useState } from "react";
import { usePanZoom } from "../controller/usePanZoom";

/** Mermaid theme variables mapped onto the site's own design tokens. */
function themeVariables(isDark) {
  const shared = {
    fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
    fontSize: "13px",
    lineColor: isDark ? "#5c7f99" : "#4a6880",
  };

  if (isDark) {
    return {
      ...shared,
      background: "transparent",
      primaryColor: "rgba(0, 212, 240, 0.10)",
      primaryBorderColor: "rgba(0, 212, 240, 0.45)",
      primaryTextColor: "#eaf4ff",
      secondaryColor: "rgba(157, 111, 255, 0.12)",
      secondaryBorderColor: "rgba(157, 111, 255, 0.42)",
      secondaryTextColor: "#eaf4ff",
      tertiaryColor: "rgba(0, 226, 160, 0.10)",
      tertiaryBorderColor: "rgba(0, 226, 160, 0.40)",
      tertiaryTextColor: "#eaf4ff",
      clusterBkg: "rgba(10, 22, 40, 0.55)",
      clusterBorder: "rgba(157, 111, 255, 0.30)",
      titleColor: "#8aadc4",
      edgeLabelBackground: "#06101e",
      textColor: "#eaf4ff",
      nodeTextColor: "#eaf4ff",
    };
  }

  return {
    ...shared,
    background: "transparent",
    primaryColor: "rgba(0, 128, 160, 0.09)",
    primaryBorderColor: "rgba(0, 128, 160, 0.48)",
    primaryTextColor: "#0c1929",
    secondaryColor: "rgba(91, 33, 182, 0.09)",
    secondaryBorderColor: "rgba(91, 33, 182, 0.42)",
    secondaryTextColor: "#0c1929",
    tertiaryColor: "rgba(4, 120, 87, 0.09)",
    tertiaryBorderColor: "rgba(4, 120, 87, 0.40)",
    tertiaryTextColor: "#0c1929",
    clusterBkg: "rgba(255, 255, 255, 0.70)",
    clusterBorder: "rgba(91, 33, 182, 0.24)",
    titleColor: "#1e3a52",
    edgeLabelBackground: "#ffffff",
    textColor: "#0c1929",
    nodeTextColor: "#0c1929",
  };
}

/** The single Mermaid config used for rendering — and for measuring. */
export function mermaidConfig(isDark) {
  return {
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    themeVariables: themeVariables(isDark),
    flowchart: {
      curve: "basis",
      padding: 14,
      nodeSpacing: 38,
      rankSpacing: 48,
      useMaxWidth: false,
      htmlLabels: false,
    },
  };
}

let renderSeq = 0;

/**
 * ArchitectureModal
 *
 * Renders a project's Mermaid architecture diagram on a pannable, zoomable
 * drafting surface. Re-renders when the site theme flips so diagram colors
 * always track the page.
 */
export function ArchitectureModal({ project, isDark, onClose }) {
  const [status, setStatus] = useState("loading");
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const { containerRef, contentRef, view, size, isPanning, fit, zoomIn, zoomOut, handlers } =
    usePanZoom();

  const diagram = project?.architecture;

  // Render the diagram. Re-runs on theme change so colors stay in sync.
  useEffect(() => {
    if (!diagram) return;

    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (cancelled) return;

        mermaid.initialize(mermaidConfig(isDark));

        const { svg } = await mermaid.render(`arch-diagram-${++renderSeq}`, diagram);
        if (cancelled || !contentRef.current) return;

        contentRef.current.innerHTML = svg;
        setStatus("ready");

        // Let layout settle before measuring for the fit transform.
        requestAnimationFrame(() => {
          if (!cancelled) fit();
        });
      } catch (err) {
        if (cancelled) return;
        console.error("[architecture] diagram failed to render:", err);
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [diagram, isDark, contentRef, fit]);

  // Close on Escape.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock page scroll and park focus on the close control while open.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  if (!project) return null;

  const zoomPercent = Math.round(view.k * 100);

  return (
    <div className="arch-overlay" role="dialog" aria-modal="true" aria-labelledby="arch-title">
      <button className="arch-backdrop" aria-label="Close architecture diagram" onClick={onClose} />

      <div className="arch-sheet">
        <header className="arch-head">
          <div className="arch-head-text">
            <h2 className="arch-title" id="arch-title">
              {project.name}
            </h2>
            {project.architectureSummary && (
              <p className="arch-summary">{project.architectureSummary}</p>
            )}
          </div>

          <button
            ref={closeRef}
            type="button"
            className="arch-close"
            onClick={onClose}
            aria-label="Close architecture diagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div
          className={`arch-stage${isPanning ? " arch-stage-grabbing" : ""}`}
          ref={containerRef}
          {...handlers}
        >
          {status === "loading" && <p className="arch-state">Drawing diagram…</p>}

          {status === "error" && (
            <p className="arch-state arch-state-error">
              This diagram could not be drawn. The source may have a syntax error.
            </p>
          )}

          <div
            className="arch-canvas"
            ref={contentRef}
            data-sized={size ? "true" : "false"}
            style={{
              opacity: status === "ready" ? 1 : 0,
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
              ...(size ? { width: `${size.w}px`, height: `${size.h}px` } : null),
            }}
          />
        </div>

        <footer className="arch-foot">
          <div className="arch-zoom" role="group" aria-label="Diagram zoom">
            <button type="button" onClick={zoomOut} aria-label="Zoom out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="arch-zoom-level" aria-live="polite">
              {zoomPercent}%
            </span>
            <button type="button" onClick={zoomIn} aria-label="Zoom in">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button type="button" className="arch-fit" onClick={fit}>
              Fit
            </button>
          </div>

          <p className="arch-hint">Drag to move, pinch or scroll to zoom</p>
        </footer>
      </div>
    </div>
  );
}
