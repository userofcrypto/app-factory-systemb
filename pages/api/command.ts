import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const command = body?.command;

    console.log("REQUEST RECEIVED:", command);

    const result = await supabase
      .from("commands")
      .insert([
        {
          command: command ?? "empty",
          response: { message: "stored", input: command }
        }
      ])
      .select();

    console.log("SUPABASE RESULT:", result);

    return res.json(result);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
