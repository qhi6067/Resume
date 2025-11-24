
export function TagRow({ items }) {
    return (
      <div className="badge-row">
        {items.map((item, index) => (
          <span className="badge" key={index}>
            <span
              style={{
                fontWeight: 500,                  // mild bold
                //textDecoration: "underline",      // underline
                textDecorationThickness: "0.6px", // subtle thin underline
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    );
  }
  