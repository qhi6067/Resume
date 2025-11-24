import { useEffect } from "react";

export function useKeyNav(onStep) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // prevent autorepeat so it doesn't skip to th e end
      if (event.repeat) return;

      if (event.key === "ArrowRight") {
        onStep(1); // move one step to the right
      } else if (event.key === "ArrowLeft") {
        onStep(-1); // move one step to the left
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // clean on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onStep]); // reattach if callback changes
}
