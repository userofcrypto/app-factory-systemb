type Plan = {
  intent: string;
  steps: string[];
  raw: string;
};

const tools = {
  "execute create operation": (input: any) => {
    return { message: "User created (mock)", input };
  },
  "fetch data": () => {
    return { data: ["item1", "item2"] };
  },
  "execute deletion": () => {
    return { message: "Record deleted (mock)" };
  }
};

export function generateExecution(plan: Plan) {
  const results = plan.steps.map((step, index) => {
    let output;

    if (tools[step as keyof typeof tools]) {
      output = tools[step as keyof typeof tools](plan.raw);
    } else {
      output = { message: "no tool mapped" };
    }

    return {
      step: index + 1,
      action: step,
      status: "completed",
      output
    };
  });

  return {
    intent: plan.intent,
    raw: plan.raw,
    executed: true,
    results
  };
}
