# codew

<a href="https://www.npmjs.com/package/codew-cli"><img src="https://img.shields.io/npm/v/codew-cli"></a>
[![CI](https://github.com/bisquit/codew-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/bisquit/codew-cli/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bisquit/codew-cli/branch/main/graph/badge.svg?token=MVivyKBgGR)](https://codecov.io/gh/bisquit/codew-cli)
[![Known Vulnerabilities](https://snyk.io/test/github/bisquit/codew-cli/badge.svg)](https://snyk.io/test/github/bisquit/codew-cli)

Open folder as a vscode multi-root workspace.

<div align="center">
  <img src="./assets/demo2.gif" width="70%" />
  <p><i>Example with <a href="https://marketplace.visualstudio.com/items?itemName=bisquit.vscode-auto-colorize">Auto Colorize</a></i></p>
</div>

## Motivation

VSCode's workspace can keep its own settings such as themes, but they are stored in directory inside it if you open a directory via `code <folder>`.

Unlike other settings, themes are per-user preferences, which you don't want to include them in your repository.

You can avoid this to create seperate `.code-workspace` file (which is called `Multi-root Workspace`), though, where should it store? How can it be called easily?

This tool bypasses that work with `codew` command.

<details>
<summary>Recap VSCode Workspaces</summary>

VSCode opens folder as **Single-folder workspaces** if you opened with `code <folder>`. Against that, if you opened with `.code-workspace`, VSCode treats it as **Multi-root Workspace**.

One difference between them is **Where the settings are stored**. The former is stored within folder itself, and the latter is stored in standalone `.code-workspace` file.

See https://code.visualstudio.com/docs/editor/workspaces#_singlefolder-workspaces more details.

</details>

## Install

<details>
<summary>npm</summary>

<br>

```sh
npm i -g codew-cli
```

</details>

<details>
<summary>yarn</summary>

<br>

```sh
yarn global add codew-cli
```

</details>

<details>
<summary>pnpm</summary>

<br>

```sh
pnpm add -g codew-cli
```

</details>

Also, make sure that `code` command is installed. (Hit `code -v`, otherwise follow [here](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line))

## Usage

Hit `codew` instead of `code`. Then it opens folder as a Multi-root Workspace.

Example:

```sh
# open current directory as a multi-root workspace
codew .
```

Workspace settings (`.code-workspace`) are automatically created and stored in `$HOME/.codew/workspaces`.

## See also

- [Auto Colorize](https://marketplace.visualstudio.com/items?itemName=bisquit.vscode-auto-colorize)
  - VSCode extension to automatically colorize workspace

## Uninstall

Hit uninstall command, for example, `npm rm -g codew-cli`, `yarn global remove codew-cli`, `pnpm rm -g codew-cli`.

Also, if you want to clean settings (including `.code-workspace`), remove `$HOME/.codew`.
