import "@newjersey/njwds/dist/css/styles.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  a11y: {},
  tags: ["autodocs"],
};

export default preview;
