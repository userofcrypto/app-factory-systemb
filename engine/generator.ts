import { supabase } from "../lib/supabase";

type Intent = "create" | "read" | "delete" | "update" | "unknown";

type Plan = {
  intent: Intent;
  raw: string;
};

const tools: Record<string, (input: string) => Promise<any>> = {
  create: async (input: string) => {
    const name = input.split(" ").slice(1).join(" ") || "Unnamed";

    const { data, error } = await supabase
      .from("users")
      .insert([{ name }])
      .select();

    if (error) return { error: error.message };

    return { message: "created", data };
  },

  read: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) return { error: error.message };

    return { data };
  },

  delete: async (input: string) => {
    const name = input.split(" ").slice(1).join(" ");

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("name", name)
      .select();

    if (error) return { error: error.message };

    return { message: "deleted", data };
  },

  update: async (input: string) => {
    const parts = input.split(" ");
    const name = parts[1];
    const newName = parts[2];

    const { data, error } = await supabase
      .from("users")
      .update({ name: newName })
      .eq("name", name)
      .select();

    if (error) return { error: error.message };

    return { message: "updated", data };
  }
};

export async function generateExecution(plan: Plan) {
  const tool = tools[plan.intent];

  if (!tool) {
    return {
      intent: plan.intent,
      raw: plan.raw,
      executed: false,
      error: "No tool for intent"
    };
  }

  const output = await tool(plan.raw);

  return {
    intent: plan.intent,
    raw: plan.raw,
    executed: true,
    output
  };
}
