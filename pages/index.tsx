import { useState } from "react";

export default function Home() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState(null);

  const sendCommand = async () => {
    const res = await fetch("/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ command })
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Command Test</h1>

      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Type a command..."
        style={{ width: "300px", marginRight: "10px" }}
      />

      <button onClick={sendCommand}>
        Send
      </button>

      <pre style={{ marginTop: "20px" }}>
        {response ? JSON.stringify(response, null, 2) : null}
      </pre>
    </div>
  );
}
