import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const command = body?.command ?? "fallback";

    const result = await supabase
      .from("commands")
      .insert([
        {
          command,
          response: { message: "stored", input: command }
        }
      ])
      .select();

    return res.json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
