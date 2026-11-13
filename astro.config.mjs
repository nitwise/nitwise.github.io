import { defineConfig } from "astro/config";

export default defineConfig({
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'none'",
        "form-action 'none'",
      ],
    },
  },
});
