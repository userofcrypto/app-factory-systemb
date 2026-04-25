import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const send = async () => {
    const res = await fetch("/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ command: "test run" })
    });

    const data = await res.json();
    setResult(JSON.stringify(data));
  };

  return (
    <div>
      <button onClick={send}>Send Test</button>
      <pre>{result}</pre>
    </div>
  );
}
