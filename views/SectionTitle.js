/**
 * SectionTitle
 *
 * Renders a section heading with:
 * - A monospace section number (01, 02, …)
 * - Animated gradient underline (triggered when parent has .section-in)
 * - Optional pill label
 *
 * @param {ReactNode} children - main title text
 * @param {string|number} num  - section number (e.g. "01")
 * @param {string} pill        - optional hint pill
 */
export function SectionTitle({ children, num, pill }) {
  return (
    <div className="section-title-wrap">
      {num && <span className="section-num">{String(num).padStart(2, "0")}</span>}

      <h2 className="section-title">
        {children}
        {pill && <span className="section-pill">{pill}</span>}
      </h2>
    </div>
  );
}
