type Intent = "create" | "read" | "update" | "delete" | "unknown";

export function planCommand(input: {
  intent: Intent;
  raw: string;
}) {
  const { intent, raw } = input;

  const baseSteps: Record<Intent, string[]> = {
    create: [
      "validate input",
      "prepare creation payload",
      "execute create operation"
    ],
    read: [
      "validate query",
      "fetch data",
      "format response"
    ],
    update: [
      "validate update request",
      "locate record",
      "apply update"
    ],
    delete: [
      "validate delete request",
      "confirm target",
      "execute deletion"
    ],
    unknown: [
      "log unrecognized command",
      "flag for review"
    ]
  };

  return {
    intent,
    steps: baseSteps[intent] || baseSteps.unknown,
    raw
  };
}
