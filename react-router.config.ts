import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  routeDiscovery: {
    mode: "lazy",
    manifestPath: "/__manifest",
  },

} satisfies Config;
