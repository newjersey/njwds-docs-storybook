import { Meta, StoryObj } from "@storybook/react";
import { ValidationOnSubmitSingleError } from "./ValidationOnSubmitSingleError";

const meta: Meta<typeof ValidationOnSubmitSingleError> = {
  title: "Interactive Form Examples/Validation/Validation on Submit (with One Error)",
  component: ValidationOnSubmitSingleError,
};

export default meta;

export const Default: StoryObj<typeof ValidationOnSubmitSingleError> = {};
