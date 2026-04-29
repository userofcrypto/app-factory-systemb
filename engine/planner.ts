type Plan = {
  intent: string;
  raw: string;
};

export function planCommand(interpreted: any): Plan {
  return {
    intent: interpreted.intent,
    raw: interpreted.raw
  };
}
