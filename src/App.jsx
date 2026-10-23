
import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  async function handleAdd() {
    const response = await fetch("http://localhost:5001/add",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        num1: num1,
        num2: num2,
      })
    });
    const data = await response.json();

    setResult(data.result);
  }

  
async function handleSubtract() {
  const response = await fetch("http://localhost:5001/sub", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      num1: num1,
      num2: num2,
    }),
  });

  const data = await response.json();

  setResult(data.result);
}


  
async function handleMultiply() {
  const response = await fetch("http://localhost:5001/mul", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      num1: num1,
      num2: num2,
    }),
  });

  const data = await response.json();

  setResult(data.result);
}



async function handleDivide() {
  if (Number(num2) === 0) {
    setResult("Cannot divide by zero");
    return;
  }

  const response = await fetch("http://localhost:5001/div", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      num1: num1,
      num2: num2,
    }),
  });

  const data = await response.json();

  setResult(data.result);
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

      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSubtract}>Subtract</button>
      <button onClick={handleMultiply}>Multiply</button>
      <button onClick={handleDivide}>Divide</button>

      <h2>Result: {result !== null ? result : ""}</h2>
    </div>
  );
}

export default App;
