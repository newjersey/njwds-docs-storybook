import { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import { ValidationOnSubmitMultipleErrors } from "./ValidationOnSubmitMultipleErrors";
import { ValidationOnSubmitSingleError } from "./ValidationOnSubmitSingleError";
import { ValidationOnBlur } from "./ValidationOnBlur";
import mdx from "./ValidationOnSubmit.mdx";
import {
  getValidationMultipleErrorsStoryElements,
  checkFieldRequiredAttributes,
  checkInitialErrorStateClassAndAriaInvalid,
  checkFormElementsForEmptyFormSubmission,
  checkErrorSummaryDisplay,
  checkAccessibleFieldAndButtonNames,
  testErrorSummaryLinkFocus,
  fillFormPartially,
  fillFormCompletely,
} from "./ValidationOnSubmitMultipleErrors.test-utils";
import {
  getValidationOnBlurElements,
  checkInitialPasswordState,
  checkPasswordValidationOnBlur,
  checkPasswordValidationOnSubmit,
  checkValidPasswordSubmission,
} from "./ValidationOnBlur.test-utils";
import {
  getValidationSingleErrorElements,
  checkSingleErrorInitialState,
  fillOutEmailAndSubmitEmailForm,
  expectsSingleErrorEmailInputToBeInvalid,
  expectsSingleErrorEmailInputToBeValid,
} from "./ValidationOnSubmitSingleError.test-utils";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "Interactive Form Examples/Validation/Error Validation",
  parameters: {
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

export const SingleErrorValidation: Story = {
  render: ValidationOnSubmitSingleError,
  name: "On Submit (1-2 Errors)",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const elements = getValidationSingleErrorElements(canvas);

    await step("Has accessible names for email field and submit button", async () => {
      expect(elements.emailInput).toHaveAccessibleName(/Email/);
      expect(elements.submitButton).toHaveAccessibleName(/Submit/);
    });

    await step("Email field does not have initial error state", async () => {
      checkSingleErrorInitialState(elements);
    });

    await step("Form validates when empty email is submitted", async () => {
      await userEvent.click(elements.submitButton);
      expectsSingleErrorEmailInputToBeInvalid(elements);
    });

    await step("Form focus moves to email input when error occurs", async () => {
      expect(elements.emailInput).toHaveFocus();
    });

    await step("Form validates when invalid email format is submitted", async () => {
      await fillOutEmailAndSubmitEmailForm(elements, "invalid-email");
      expectsSingleErrorEmailInputToBeInvalid(elements);
    });

    await step("Form validates when email without domain is submitted", async () => {
      await fillOutEmailAndSubmitEmailForm(elements, "test@");
      expectsSingleErrorEmailInputToBeInvalid(elements);
    });

    await step("Form validates when email without @ symbol is submitted", async () => {
      await fillOutEmailAndSubmitEmailForm(elements, "testexample.com");
      expectsSingleErrorEmailInputToBeInvalid(elements);
    });

    await step("Error is cleared when valid email is submitted", async () => {
      await fillOutEmailAndSubmitEmailForm(elements, "test@example.com");
      expectsSingleErrorEmailInputToBeValid(elements);
    });
  },
};

export const MultipleErrorValidation: Story = {
  render: ValidationOnSubmitMultipleErrors,
  name: "On Submit (3+ Errors, With Error Summary)",

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
      expect(errorSummary).toHaveFocus();
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

export const ValidateErrorOnBlur: Story = {
  render: ValidationOnBlur,
  name: "On Blur",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const elements = getValidationOnBlurElements(canvas);

    await step("Has accessible names for password field and submit button", async () => {
      expect(elements.passwordInput).toHaveAccessibleName(/Enter password/);
      expect(elements.submitButton).toHaveAccessibleName(/Submit/);
    });

    await step("Password field has proper 'required' attributes", async () => {
      expect(elements.passwordInput).toBeRequired();
      expect(elements.passwordInput).toHaveAccessibleName();
    });

    await step("Shows password requirements and has no initial error state", async () => {
      expect(elements.passwordInput).not.toHaveClass("usa-input--error");
      expect(elements.passwordInput).not.toHaveAttribute("aria-invalid", "true");

      checkInitialPasswordState(elements);

      const errorMessage = elements.canvas.queryByRole("alert");
      expect(errorMessage).not.toBeInTheDocument();
    });

    await step("Validates empty password on blur", async () => {
      const emptyPassword = "";
      checkPasswordValidationOnBlur(elements, emptyPassword, "Please enter a password");
    });

    await step("Validates password too short on blur", async () => {
      const shortPassword = "test";
      await checkPasswordValidationOnBlur(elements, shortPassword, "Password is too short");
    });

    await step("Validates missing lowercase letter on blur", async () => {
      const passwordWithoutLowercase = "PASSWORD123";
      await checkPasswordValidationOnBlur(
        elements,
        passwordWithoutLowercase,
        "Password must contain a lowercase letter",
      );
    });

    await step("Validates missing uppercase letter on blur", async () => {
      const passwordWithoutUpperCase = "password123";
      await checkPasswordValidationOnBlur(
        elements,
        passwordWithoutUpperCase,
        "Password must contain an uppercase letter",
      );
    });

    await step("Validates missing number on blur", async () => {
      const passwordWithoutNumber = "passwordONE";
      await checkPasswordValidationOnBlur(
        elements,
        passwordWithoutNumber,
        "Password must contain a number",
      );
    });

    await step("Validates invalid password on form submission", async () => {
      await checkPasswordValidationOnSubmit(elements, "weak", "Password is too short");
    });

    await step("Form focus moves to password input when validation fails on submit", async () => {
      expect(elements.passwordInput).toHaveFocus();
    });

    await step("Accepts valid password on form submission", async () => {
      await checkValidPasswordSubmission(elements);
    });
  },
};
