import { interpretCommand } from "@/engine/interpreter";
import { createPlan } from "@/engine/planner";
import { generateProject } from "@/engine/generator";
import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  const { command } = req.body;

  // 1. Interpret
  const interpretation = interpretCommand(command);

  // 2. Plan
  const plan = createPlan(interpretation.intent, command);

  // 3. Generate
  const project = generateProject(plan);

  // 4. Save to Supabase
  const { data } = await supabase
    .from("factory_commands")
    .insert([
      {
        raw_command: command,
        intent: interpretation.intent,
        parsed: plan
      }
    ])
    .select()
    .single();

  return res.json({
    success: true,
    commandId: data?.id,
    interpretation,
    plan,
    project
  });
}
