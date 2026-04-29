import { generateExecution } from "../../engine/generator";
import { planCommand } from "../../engine/planner";
import { supabase } from "../../lib/supabase";
import { interpretCommand } from "../../engine/interpreter";
export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const command = body?.command ?? "fallback";
    const interpreted = interpretCommand(command);
    const plan = planCommand(interpreted);
    const execution = await generateExecution(plan);
    const result = await supabase
      .from("commands")
      .insert([
        {
          command,
          response: {
  interpretation: interpreted,
  plan,
  execution
}
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
