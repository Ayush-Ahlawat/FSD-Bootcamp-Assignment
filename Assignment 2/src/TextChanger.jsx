import { useState } from "react";

function TextChanger() {
  const [text, setText] = useState("Hello");

  return (
    <div>
      <h2>{text}</h2>

      <button onClick={() => setText("React is Awesome")}>
        Change Text
      </button>
    </div>
  );
}

export default TextChanger;