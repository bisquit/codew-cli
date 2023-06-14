import slash from 'slash';

type CreateWorkspaceFileProps = {
  path: string;
};

export function createWorkspaceTemplate({ path }: CreateWorkspaceFileProps) {
  // Windows backslash path (e.g. `C:\Users\xxx\yyy`) is not valid in vscode workspace json.
  const slashedPath = slash(path);

  return `
{
  "folders": [
    {
      "path": "${slashedPath}"
    }
  ]
}`.trim();
}
