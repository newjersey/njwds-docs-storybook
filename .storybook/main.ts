import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest", "@storybook/addon-a11y"],

  core: {
    builder: "@storybook/builder-vite",
  },
};

export default config;
