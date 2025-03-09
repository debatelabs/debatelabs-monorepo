export default {
  "apps/server/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@debatelabs/server --",
    "turbo test:related --filter=@debatelabs/server --",
  ],
  "apps/client/**/*.{js,jsx,ts,tsx}": [
    "pnpm format",
    "turbo lint --filter=@debatelabs/client --",
    "turbo test:related --filter=@debatelabs/client --",
  ],
  "**/*.{json,md,config.js,config.mjs,yaml,yml}": ["prettier --write"],
};
