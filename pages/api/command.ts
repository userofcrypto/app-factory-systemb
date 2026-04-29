import { generateExecution } from "../../engine/generator";
import { interpretCommand } from "../../engine/interpreter";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const command = body?.command ?? "";

    const interpretation = interpretCommand(command);

    // ONLY execution, no plan anywhere
    const execution = await generateExecution({
      intent: interpretation.intent,
      raw: command
    });

    const cleanResponse = {
      intent: interpretation.intent,
      execution: execution.execution
    };

    const { data, error } = await supabase
      .from("commands")
      .insert([
        {
          command,
          response: cleanResponse
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    return res.json({
      success: true,
      data
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
