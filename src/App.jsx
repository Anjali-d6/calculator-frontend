import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const API_URL = "https://calculator-backend-t3fb.onrender.com";

  async function calculate(operation) {
    if (num1 === "" || num2 === "") {
      setResult("Please enter both numbers");
      return;
    }

    if (operation === "div" && Number(num2) === 0) {
      setResult("Cannot divide by zero");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${operation}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: Number(num1),
          num2: Number(num2),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data.error || "Calculation failed");
        return;
      }

      setResult(data.result);
    } catch (error) {
      console.error("API error:", error);
      setResult("Unable to connect to backend");
    }
  }

  return (
    <div>
      <h1>My Calculator</h1>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(event) => setNum1(event.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(event) => setNum2(event.target.value)}
      />

      <br />
      <br />

      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("sub")}>Subtract</button>
      <button onClick={() => calculate("mul")}>Multiply</button>
      <button onClick={() => calculate("div")}>Divide</button>

      <h2>Result: {result !== null ? result : ""}</h2>
    </div>
  );
}

export default App;
