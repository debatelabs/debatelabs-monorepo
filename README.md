# How To Launch

## Step 1

This project uses `pnpm` package manager.  
If you don't have it installed on your machine, run the following command:

```bash
npm i -g pnpm
```

Install all dependencies:

```bash
pnpm install
```

To install new packages or run any command from `package.json` always use `pnpm` instead of `npm`.  
For installing packages also add `--filter` flag to specify workspace.

Example:

```
pnpm add --save-dev typescript --filter @repo/client
```

## Step 2

Setting .env file.

## Step 3

To start in dev mode:

```bash
docker build
docker compose up -d
```
test
