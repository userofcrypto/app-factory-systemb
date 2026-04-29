import { supabase } from "../lib/supabase";

type Plan = {
  intent: string;
  steps: string[];
  raw: string;
};

const tools = {
  "execute create operation": async (input: string) => {
    // extract name from command: "create John" → "John"
    const parts = input.split(" ");
    const name = parts.slice(1).join(" ") || "Unnamed";

    const { data, error } = await supabase
      .from("users")
      .insert([{ name }]);

    if (error) {
      return { error: error.message };
    }

    return { message: "User created (real)", data };
  },

  "fetch data": async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      return { error: error.message };
    }

    return { data };
  },

  "execute deletion": async (input: string) => {
    const parts = input.split(" ");
    const name = parts.slice(1).join(" ");

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("name", name);

    if (error) {
      return { error: error.message };
    }

    return { message: "User deleted (real)", data };
  }
};

export async function generateExecution(plan: Plan) {
  const results = [];

  for (let index = 0; index < plan.steps.length; index++) {
    const step = plan.steps[index];

    let output;

    if (tools[step as keyof typeof tools]) {
      output = await tools[step as keyof typeof tools](plan.raw);
    } else {
      output = { message: "no tool mapped" };
    }

    results.push({
      step: index + 1,
      action: step,
      status: "completed",
      output
    });
  }

  return {
    intent: plan.intent,
    raw: plan.raw,
    executed: true,
    results
  };
}
