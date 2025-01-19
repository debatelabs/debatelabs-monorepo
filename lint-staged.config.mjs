export default {
  "apps/server/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@repo/server --",
    "turbo test:related --filter=@repo/server --",
  ],
  "apps/client/**/*.{js,jsx,ts,tsx}": [
    "pnpm format",
    "turbo lint --filter=@repo/client --",
    "turbo test:related --filter=@repo/client --",
  ],
  "**/*.{json,md,config.js,config.mjs,yaml,yml}": ["prettier --write"],
};
