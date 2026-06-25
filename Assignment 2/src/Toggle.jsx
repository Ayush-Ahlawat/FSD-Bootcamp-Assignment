import { useState } from "react";

function Toggle() {
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h2>{status ? "ON" : "OFF"}</h2>

      <button onClick={() => setStatus(!status)}>
        Toggle
      </button>
    </div>
  );
}

export default Toggle;