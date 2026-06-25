import FormHandling from "./FormHandling";
import Counter from "./Counter";
import Toggle from "./Toggle";
import TextChanger from "./TextChanger";
import ColorChanger from "./ColorChanger";
import LikeButton from "./LikeButton";

function App() {
  return (
    <div>
      <h1>5 useState Examples</h1>

      <Counter />
      <hr />

      <Toggle />
      <hr />

      <TextChanger />
      <hr />

      <ColorChanger />
      <hr />

      <LikeButton />
      <hr />

      <FormHandling />
    </div>
  );
}

export default App; 