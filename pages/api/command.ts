import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { command } = req.body;

  const response = {
    message: "stored",
    input: command
  };

  await supabase.from("commands").insert([
    {
      command,
      response
    }
  ]);

  res.json(response);
}
