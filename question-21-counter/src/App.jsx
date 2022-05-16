import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>Count is: {count}</div>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Increase Count
      </button>
      <button type="button" onClick={() => setCount((count) => count - 1)}>
        Decrease Count
      </button>
    </div>
  );
}

export default App;
