import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const command = body?.command || "fallback-test";

    const response = {
      message: "stored",
      input: command
    };

    const { data, error } = await supabase.from("commands").insert([
      {
        command,
        response
      }
    ]);

    if (error) {
      return res.status(500).json({ error });
    }

    res.json({ success: true, command, response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
