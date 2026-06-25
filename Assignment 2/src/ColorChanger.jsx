import { useState } from "react";

function ColorChanger() {
  const [color, setColor] = useState("black");

  return (
    <div>
      <h2 style={{ color: color }}>Color Example</h2>

      <button onClick={() => setColor("red")}>
        Red
      </button>

      <button onClick={() => setColor("blue")}>
        Blue
      </button>
    </div>
  );
}

export default ColorChanger;