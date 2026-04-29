import { generateExecution } from "../../engine/generator";
import { interpretCommand } from "../../engine/interpreter";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const command = body?.command ?? "";

    const interpretation = interpretCommand(command);

    const execution = await generateExecution({
      intent: interpretation.intent as any,
      raw: command
    });

    const { data, error } = await supabase
      .from("commands")
      .insert([
        {
          command,
          response: {
            intent: interpretation.intent,
            execution
          }
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
