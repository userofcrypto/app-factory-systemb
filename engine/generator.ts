type Plan = {
  intent: string;
  steps: string[];
  raw: string;
};

export function generateExecution(plan: Plan) {
  const results = plan.steps.map((step, index) => {
    return {
      step: index + 1,
      action: step,
      status: "completed"
    };
  });

  return {
    intent: plan.intent,
    raw: plan.raw,
    executed: true,
    results
  };
}
