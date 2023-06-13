# codew

Open folder as a vscode multi-root workspace.

## Install

```sh
npm i -g codew
```

```sh
yarn global add codew
```

```sh
pnpm add -g codew
```

## Usage

Simply hit `codew` instead of `code`. Then it opens folder as Multi-root Workspace.

<details>
<summary>What is Multi-root Workspace?</summary>

VSCode opens folder as `Single-folder workspaces` if you opened with `code <folder>`. Against that, if you opened with `.code-workspace`, VSCode treats it as `Multi-root Workspace`.

One difference between them is `Where the settings are stored`. Former is stored within folder itself, and latter is stored in standalone `.code-workspace` file.

See https://code.visualstudio.com/docs/editor/workspaces#_singlefolder-workspaces more details.

</details>

```sh
codew .
```

Workspace settings (`.code-workspace`) are automatically stored in `$HOME/.codew/workspaces`.
