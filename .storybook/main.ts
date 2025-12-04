
import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
const rootDir = process.cwd();
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-webpack5",
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(rootDir, 'src'),
      "@src/*": path.resolve(rootDir, 'src/*'),
      "@stateless/*": path.resolve(rootDir, "src/components/stateless/*"),
      "@stateful/*": path.resolve(rootDir, "src/components/stateful/*"),
      "@hooks/*": path.resolve(rootDir, "src/components/hooks/*"),
      "@container/*": path.resolve(rootDir, "src/components/container/*"),
      "@assets/*": path.resolve(rootDir, "src/assets/*"),
      "@pages/*": path.resolve(rootDir, "src/pages/*"),
      "@routers/*": path.resolve(rootDir, "src/routers/*"),
      "@utils/*": path.resolve(rootDir, "src/utils/*"),
      "@theme/*": path.resolve(rootDir, "src/theme/*")
    };
    // If building for a subpath (e.g. /pro-react-admin/storybook/)
    // you can set the STORYBOOK_BASE_HREF env var when running the build.
    // This will make webpack emit assets with the correct publicPath.
    // Example: STORYBOOK_BASE_HREF=/pro-react-admin/storybook/ npm run build-storybook
    // const baseHref = process.env.STORYBOOK_BASE_HREF;
    // if (baseHref) {
    //   config.output = config.output || {};
    //   // webpack expects a string, ensure it ends with a slash
    //   config.output.publicPath = baseHref.endsWith('/') ? baseHref : baseHref + '/';
    // }

    return config;
  },
};
export default config;