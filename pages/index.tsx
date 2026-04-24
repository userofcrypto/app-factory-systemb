import { useState } from "react";

export default function Home() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const sendCommand = async () => {
    const res = await fetch("/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command })
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Factory System</h1>

      <input
        style={{ width: 400, padding: 10 }}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Type command..."
      />

      <button onClick={sendCommand} style={{ marginLeft: 10 }}>
        Send
      </button>

      <pre style={{ marginTop: 20 }}>{response}</pre>
    </div>
  );
}
