import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from 'vite-tsconfig-paths';

import { join, dirname, resolve } from "path";
import { mergeConfig } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  core: {
    builder: getAbsolutePath("@storybook/builder-vite")
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        '@ui': resolve(__dirname, '../src/components/common'),
        '@features': resolve(__dirname, '../src/components/features'),
      },
      plugins: [tsconfigPaths()],
      optimizeDeps: {
        include: ['react', 'react-dom'], // Ajoutez les modules nécessaires
      },
    });
  },
};

export default config;
