type CreateWorkspaceFileProps = {
  path: string;
};

export function createWorkspaceTemplate({ path }: CreateWorkspaceFileProps) {
  return `
{
  "folders": [
    {
      "path": "${path}"
    }
  ]
}`.trim();
}
