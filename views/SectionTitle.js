// components/SectionTitle.js

/**
 * SectionTitle
 * Simple view component that renders a section heading with an optional pill label.
 *
 * @param {ReactNode} children - main title text.
 * @param {string} pill        - optional small pill-like label aligned to the right.
 */
export function SectionTitle({ children, pill }) {
    return (
      <div className="section-title">
        <h2 className="h2">
          {children}
          {/* If a pill prop is passed, render the pill span next to the title */}
          {pill && <span className="pill">{pill}</span>}
        </h2>
  
        {/* Styled JSX: local styles only for this component */}
        <style jsx>{`
          .section-title {
            margin: 2px 0 10px;
          }
          .pill {
            margin-left: 10px;
            font-size: 12px;
            padding: 2px 8px;
            border: 1px solid #254257;
            border-radius: 999px;
            background: #0f2130;
            vertical-align: middle;
            color: #9dd7ff;
          }
        `}</style>
      </div>
    );
  }
  