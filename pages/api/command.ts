import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const result = await supabase
      .from("commands")
      .insert([
        {
          command: "test run",
          response: { message: "stored" }
        }
      ])
      .select();

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
