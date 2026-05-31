const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const extractVariables = (text) => {
  const variables = new Set();
  let match;

  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};
