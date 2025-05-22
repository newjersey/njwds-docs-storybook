import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@whitespace/storybook-addon-html"],
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    autodocs: true,
  },
};

export default config;
