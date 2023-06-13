type TemplateVariables = {
  path: string;
};

export default function ({ path }: TemplateVariables) {
  return `
{
  "folders": [
    {
      "path": "${path}"
    }
  ]
}`.trim();
}
