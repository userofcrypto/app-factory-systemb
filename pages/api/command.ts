import { generateExecution } from "../../engine/generator";
import { interpretCommand } from "../../engine/interpreter";

export default async function handler(req, res) {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const command = body?.command ?? "";

  const interpretation = interpretCommand(command);

  const execution = await generateExecution({
    intent: interpretation.intent,
    raw: command
  });

  return res.json({
    success: true,
    data: {
      intent: interpretation.intent,
      execution
    }
  });
}
