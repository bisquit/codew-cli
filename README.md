# codew

<a href="https://www.npmjs.com/package/codew"><img src="https://img.shields.io/npm/v/codew"></a>
[![CI](https://github.com/bisquit/codew/actions/workflows/ci.yml/badge.svg)](https://github.com/bisquit/codew/actions/workflows/ci.yml)

**This project is work in progress. Do NOT use.**

Open folder as a vscode multi-root workspace.

<div align="center">
  <img src="./assets/demo.gif" width="70%" />
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

```sh
npm i -g codew
```

```sh
yarn global add codew
```

```sh
pnpm add -g codew
```

Also, make sure that `code` command is installed. (Hit `code -v`, otherwise follow [here](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line))

## Usage

Hit `codew` instead of `code`. Then it opens folder as a Multi-root Workspace.

Example:

```sh
# open current directory as a multi-root workspace
codew .

# open specified directory
codew ~/Desktop/dir
```

Workspace settings (`.code-workspace`) are automatically created and stored in `$HOME/.codew/workspaces`.

## Usecases

- Use with theme switcher such as [Peacock](https://github.com/johnpapa/vscode-peacock)
  - In actuality, this project started with the desire to use Peacock in a single folder

## Uninstall

Hit uninstall command, for example, `npm rm -g codew`, `yarn global remove codew`, `pnpm rm -g codew`.

Also, if you want to clean settings (including `.code-workspace`), remove `$HOME/.codew`.
