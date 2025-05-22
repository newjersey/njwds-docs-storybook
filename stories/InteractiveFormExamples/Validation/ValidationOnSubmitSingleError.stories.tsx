import { Meta } from "@storybook/react";
import { ValidationOnSubmitSingleError } from "./ValidationOnSubmitSingleError";
import mdx from "./ValidationOnSubmitSingleError.mdx";

const meta = {
  title: "Interactive Form Examples/Validation/Validation on Submit (with One Error)",
  render: ValidationOnSubmitSingleError,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

export const Docs = {};
