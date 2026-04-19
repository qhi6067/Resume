"use client";

/**
 * BB8Toggle
 *
 * A BB8-themed light/dark mode toggle.
 * unchecked = DAY / LIGHT mode
 * checked   = NIGHT / DARK mode
 *
 * CSS classes are defined globally in styles/page.css
 *
 * HTML structure note: stars must be the first 7 children of
 * .bb8-toggle__container (nth-child selectors in the CSS depend on this).
 */
export function BB8Toggle({ checked, onChange }) {
  return (
    <label className="bb8-toggle" aria-label={checked ? "Switch to light mode" : "Switch to dark mode"}>
      <input
        className="bb8-toggle__checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="bb8-toggle__container">
        {/* Stars — must be nth-child 1–7 of container */}
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />
        <div className="bb8-toggle__star" />

        {/* Scenery: tattoos + clouds */}
        <div className="bb8-toggle__scenery">
          <div className="tatto-1" />
          <div className="tatto-2" />
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
          <div className="bb8-toggle__cloud" />
        </div>

        {/* BB8 droid */}
        <div className="bb8">
          <div className="bb8__head-container">
            <span className="bb8__antenna" />
            <span className="bb8__antenna" />
            <div className="bb8__head" />
          </div>
          <div className="bb8__body" />
        </div>

        {/* Hidden desert details */}
        <div className="artificial__hidden">
          <div className="gomrassen" />
          <div className="hermes" />
          <div className="chenini" />
        </div>

        {/* Shadow */}
        <div className="bb8__shadow" />
      </div>
    </label>
  );
}
