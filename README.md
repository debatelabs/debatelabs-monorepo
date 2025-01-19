This is a monorepo built using `Turborepo`.

# Apps and Packages

- `@playnest/server`: Nest.js app
- `@playnest/client`: React app
- `@playnest/ts-config`: typescript configurations
- `@playnest/eslint-config`: eslint configurations
- `@playnest/prettier-config`: prettier configuration

Each app is 100% [TypeScript](https://www.typescriptlang.org/).

# Contributing

1. Create an **issue**. Assign yourself
2. Create a **new branch** from `dev` branch. Every branch name should start with task number and contain short description. e.g. **125-navbar-fix**
3. Commit changes
4. Create a **pull request**
5. Link pull request to an issue
6. **Squash and merge** into `dev` branch
7. **Delete** task branch (e.g. **125-navbar-fix**)

# How To Launch

## Step 1

This project uses `pnpm` package manager.  
If you don't have it installed on your machine, run the following command:

```bash
npm i -g pnpm
```

To install new packages or run any command from `package.json` always use `pnpm` instead of `npm`.  
For installing packages also add `--filter` flag to specify workspace.

Example:

```
pnpm add --save-dev typescript --filter @repo/client
```

## Step 2

Install all dependencies:

```bash
pnpm install
```

## Step 3

To start all apps and packages in dev mode:

```bash
pnpm dev
```
