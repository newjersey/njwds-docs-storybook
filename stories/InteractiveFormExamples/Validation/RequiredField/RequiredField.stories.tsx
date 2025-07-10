import { Meta } from "@storybook/react";
import { RequiredFieldMultipleWithAsterisk } from "./RequiredFieldMultipleWithAsterisk";
import { RequiredFieldMultipleNoAsterisk } from "./RequiredFieldMultipleNoAsterisk";
import mdx from "./RequiredField.mdx";

const meta = {
  title: "Interactive Form Examples/Validation/Required Field",
  parameters: {
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

export const WithAsterisk = {
  render: RequiredFieldMultipleWithAsterisk,
  name: "Required Fields (with Asterisks)",
};

export const WithoutAsterisk = {
  render: RequiredFieldMultipleNoAsterisk,
  name: "Required Fields (without Asterisks)",
};

export const Docs = {};
