import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import { RequiredFieldMultipleWithAsterisk } from "./RequiredFieldMultipleWithAsterisk";
import { RequiredFieldMultipleNoAsterisk } from "./RequiredFieldMultipleNoAsterisk";
import mdx from "./RequiredField.mdx";
import {
  getRequiredFieldStoryElements,
  checkFieldRequiredAttributes,
  checkInitialErrorStateClassAndAriaInvalid,
  checkFormElementsForEmptyFormSubmission,
  fillAndSubmitForm,
  checkAccessibleFieldAndButtonNames,
} from "./RequiredField.test-utils";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "Interactive Form Examples/Validation/Required Field",
  parameters: {
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

export const WithAsterisk: Story = {
  render: RequiredFieldMultipleWithAsterisk,
  name: "Required Fields (with Asterisks)",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const elements = getRequiredFieldStoryElements(canvas);

    await step(
      "Has explanation of asterisks for required fields and asterisks after each required field",
      async () => {
        expect(
          canvas.getByText(/Required fields are marked with an asterisk \(*\)/),
        ).toBeInTheDocument();
        expect(canvas.getByText(/First name*/)).toBeInTheDocument();
        expect(canvas.getByText(/Last name*/)).toBeInTheDocument();
      },
    );

    await step("Required fields have proper 'required' attributes for accessibility", async () => {
      checkFieldRequiredAttributes(elements);
    });

    await step("Has accessible names for all fields and submit button", async () => {
      checkAccessibleFieldAndButtonNames(elements);
    });

    await step("Fields do not have initial error state classes or aria-invalid", async () => {
      checkInitialErrorStateClassAndAriaInvalid(elements);
    });

    await step(
      "Form validates when empty form is submitted and shows errors for required fields",
      async () => {
        await userEvent.click(elements.submitButton);
        checkFormElementsForEmptyFormSubmission(elements);
      },
    );

    await step("Form focus moves to first required field with error", async () => {
      expect(elements.firstNameInput).toHaveFocus();
    });

    await step("Required error validations are cleared by filling input", async () => {
      fillAndSubmitForm(elements);
    });
  },
};

export const WithoutAsterisk: Story = {
  render: RequiredFieldMultipleNoAsterisk,
  name: "Required Fields (without Asterisks)",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const elements = getRequiredFieldStoryElements(canvas);

    await step(
      "Has explanation of how required and optional fields are marked and explictly marked optional field",
      async () => {
        expect(
          canvas.getByText(/All fields are required unless marked optional/),
        ).toBeInTheDocument();

        expect(canvas.getByText(/Middle name \(optional\)/)).toBeInTheDocument();
      },
    );

    await step("Required fields have proper 'required' attributes for accessibility", async () => {
      checkFieldRequiredAttributes(elements);
    });

    await step("Has accessible names for all fields and submit button", async () => {
      checkAccessibleFieldAndButtonNames(elements);
    });

    await step("Fields do not have initial error state classes or aria-invalid", async () => {
      checkInitialErrorStateClassAndAriaInvalid(elements);
    });

    await step(
      "Form validates when empty form is submitted and shows errors for required fields",
      async () => {
        await userEvent.click(elements.submitButton);
        checkFormElementsForEmptyFormSubmission(elements);
      },
    );

    await step("Form focus moves to first required field with error", async () => {
      expect(elements.firstNameInput).toHaveFocus();
    });

    await step("Required error validations are cleared by filling input", async () => {
      fillAndSubmitForm(elements);
    });
  },
};
