// components/BadgeRow.js
// Renders normal badges (used for Skills, Experience, etc.)
// No bolding, no underline.

export function BadgeRow({ items }) {
    return (
      <div className="badge-row">
        {items.map((item, index) => (
          <span className="badge" key={index}>
            {item}
          </span>
        ))}
      </div>
    );
  }
  