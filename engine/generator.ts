import { supabase } from "../lib/supabase";

type Plan = {
  intent: "create" | "read" | "delete" | "update" | string;
  steps?: string[];
  raw: string;
};

const tools: Record<string, (input: string) => Promise<any>> = {
  create: async (input: string) => {
    const parts = input.split(" ");
    const name = parts.slice(1).join(" ") || "Unnamed";

    const { data, error } = await supabase
      .from("users")
      .insert([{ name }])
      .select();

    if (error) return { error: error.message };

    return { message: "User created (real)", data };
  },

  read: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) return { error: error.message };

    return { data };
  },

  delete: async (input: string) => {
    const parts = input.split(" ");
    const name = parts.slice(1).join(" ");

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("name", name)
      .select();

    if (error) return { error: error.message };

    return { message: "User deleted (real)", data };
  }
};

export async function generateExecution(plan: Plan) {
  const intent = plan.intent;

  const tool = tools[intent];

  if (!tool) {
    return {
      intent,
      raw: plan.raw,
      executed: false,
      error: "No tool mapped to intent"
    };
  }

  const output = await tool(plan.raw);

  return {
    intent,
    raw: plan.raw,
    executed: true,
    output
  };
}
