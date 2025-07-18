import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import { ValidationOnSubmitMultipleErrors } from "./ValidationOnSubmitMultipleErrors";
import mdx from "./ValidationOnSubmitMultipleErrors.mdx";
import {
  getValidationMultipleErrorsStoryElements,
  checkFieldRequiredAttributes,
  checkInitialErrorStateClassAndAriaInvalid,
  checkFormElementsForEmptyFormSubmission,
  checkForElementFocus,
  checkErrorSummaryDisplay,
  checkAccessibleFieldAndButtonNames,
  testErrorSummaryLinkFocus,
  fillFormPartially,
  fillFormCompletely,
} from "./ValidationOnSubmitMultipleErrors.test-utils";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "Interactive Form Examples/Validation/Validation on Submit (with Multiple Errors)",
  render: ValidationOnSubmitMultipleErrors,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

export const Docs = {};

export const MultipleErrorValidation: Story = {
  render: ValidationOnSubmitMultipleErrors,
  name: "Multiple Error Validation with Tests",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const elements = getValidationMultipleErrorsStoryElements(canvas);

    await step("Has accessible names for all fields and submit button", async () => {
      checkAccessibleFieldAndButtonNames(elements);
    });

    await step("Required fields have proper 'required' attributes for accessibility", async () => {
      checkFieldRequiredAttributes(elements);
    });

    await step("Fields do not have initial error state classes or aria-invalid", async () => {
      checkInitialErrorStateClassAndAriaInvalid(elements);
    });

    await step(
      "Form validates when empty form is submitted and shows errors for all required fields",
      async () => {
        await userEvent.click(elements.submitButton);
        checkFormElementsForEmptyFormSubmission(elements);
      },
    );

    await step("Error summary displays when all 3 fields have errors", async () => {
      checkErrorSummaryDisplay(elements);
    });

    await step("Error summary receives focus when displayed", async () => {
      const errorSummary = canvas.getByRole("region", { name: /There is a problem/i });
      checkForElementFocus(errorSummary);
    });

    await step("Form focus moves to error summary when 3+ errors are present", async () => {
      const errorSummary = canvas.getByRole("region", { name: /There is a problem/i });
      checkForElementFocus(errorSummary);
    });

    await step("Error summary links focus the correct input fields", async () => {
      await testErrorSummaryLinkFocus(elements);
    });

    await step("Error summary is hidden when errors are reduced to fewer than 3", async () => {
      await fillFormPartially(elements);
    });

    await step("All error validations are cleared by filling all inputs", async () => {
      await fillFormCompletely(elements);
    });
  },
};
