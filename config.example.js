// Copy this file to config.js and fill in your real keys.
// config.js is git-ignored — it never gets committed, so your keys stay
// out of the repo's history. GitHub Actions injects the deployed copy
// from repo secrets at build time (see .github/workflows/deploy.yml).
window.APP_CONFIG = {
  CARTO_API_KEY: "YOUR_CARTO_KEY_HERE",
  GOOGLE_PLACES_API_KEY: "",
  // Dedicated key for EIA report extraction — use a SEPARATE key from any other
  // Claude usage, with a hard spend limit set in the Anthropic Console. This key
  // is called directly from browser JS (anthropic-dangerous-direct-browser-access),
  // which is only acceptable for a scoped, unpublicized prototype — see
  // process-stacking-engine.js for where it's used and why.
  CLAUDE_API_KEY: ""
};
