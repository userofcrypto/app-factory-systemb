import { supabase } from "../lib/supabase";

type Intent = "create" | "read" | "delete" | "update" | "unknown";

type Input = {
  intent: Intent;
  raw: string;
};

const tools = {
  create: async (raw: string) => {
    const name = raw.split(" ").slice(1).join(" ") || "Unnamed";

    const { data, error } = await supabase
      .from("users")
      .insert([{ name }])
      .select();

    if (error) return { error: error.message };

    return { data };
  },

  read: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) return { error: error.message };

    return { data };
  },

  delete: async (raw: string) => {
    const name = raw.split(" ").slice(1).join(" ");

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("name", name)
      .select();

    if (error) return { error: error.message };

    return { data };
  },

  update: async (raw: string) => {
    const parts = raw.split(" ");
    const oldName = parts[1];
    const newName = parts[2];

    const { data, error } = await supabase
      .from("users")
      .update({ name: newName })
      .eq("name", oldName)
      .select();

    if (error) return { error: error.message };

    return { data };
  }
};

export async function generateExecution(input: Input) {
  const tool = tools[input.intent as keyof typeof tools];

  if (!tool) {
    return {
      intent: input.intent,
      raw: input.raw,
      error: "no tool found"
    };
  }

  const output = await tool(input.raw);

  return {
    intent: input.intent,
    raw: input.raw,
    output
  };
}
