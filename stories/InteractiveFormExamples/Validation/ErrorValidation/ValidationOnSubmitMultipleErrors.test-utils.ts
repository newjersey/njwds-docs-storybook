import { expect, userEvent } from "storybook/test";

export const getValidationMultipleErrorsStoryElements = (canvas: any) => ({
  firstNameInput: canvas.getByLabelText(/First name/),
  lastNameInput: canvas.getByLabelText(/Last name/),
  emailInput: canvas.getByLabelText(/Email Address/),
  submitButton: canvas.getByRole("button", { name: /Submit/ }),
  canvas,
});

export interface ValidationMultipleErrorsElements {
  firstNameInput: HTMLElement;
  lastNameInput: HTMLElement;
  emailInput: HTMLElement;
  submitButton: HTMLElement;
  canvas: any;
}

export const checkAccessibleFieldAndButtonNames = async (
  elements: ValidationMultipleErrorsElements,
) => {
  expect(elements.firstNameInput).toHaveAccessibleName(/First name/);
  expect(elements.lastNameInput).toHaveAccessibleName(/Last name/);
  expect(elements.emailInput).toHaveAccessibleName(/Email Address/);
  expect(elements.submitButton).toHaveAccessibleName(/Submit/);
};

export const checkFieldRequiredAttributes = async (elements: ValidationMultipleErrorsElements) => {
  expect(elements.firstNameInput).toBeRequired();
  expect(elements.firstNameInput).toHaveAccessibleName();
  expect(elements.lastNameInput).toBeRequired();
  expect(elements.emailInput).toBeRequired();
};

export const checkInitialErrorStateClassAndAriaInvalid = (
  elements: ValidationMultipleErrorsElements,
) => {
  expect(elements.firstNameInput).not.toHaveClass("usa-input--error");
  expect(elements.lastNameInput).not.toHaveClass("usa-input--error");
  expect(elements.emailInput).not.toHaveClass("usa-input--error");

  expect(elements.firstNameInput).not.toHaveAttribute("aria-invalid", "true");
  expect(elements.lastNameInput).not.toHaveAttribute("aria-invalid", "true");
  expect(elements.emailInput).not.toHaveAttribute("aria-invalid", "true");
};

export const checkFormElementsForEmptyFormSubmission = async (
  elements: ValidationMultipleErrorsElements,
) => {
  const fieldFirstNameError = elements.canvas.getByText("Enter your first name", {
    selector: "#first-name-error-message",
  });
  const fieldLastNameError = elements.canvas.getByText("Enter your last name", {
    selector: "#last-name-error-message",
  });
  const fieldEmailError = elements.canvas.getByText("Enter your email address", {
    selector: "#email-address-error-message",
  });

  expect(fieldFirstNameError).toBeInTheDocument();
  expect(fieldFirstNameError).toHaveClass("usa-error-message");
  expect(elements.firstNameInput).toHaveAccessibleDescription("Enter your first name");
  expect(elements.firstNameInput).toHaveClass("usa-input--error");

  expect(fieldLastNameError).toBeInTheDocument();
  expect(fieldLastNameError).toHaveClass("usa-error-message");
  expect(elements.lastNameInput).toHaveAccessibleDescription("Enter your last name");
  expect(elements.lastNameInput).toHaveClass("usa-input--error");

  expect(fieldEmailError).toBeInTheDocument();
  expect(fieldEmailError).toHaveClass("usa-error-message");
  expect(elements.emailInput).toHaveAccessibleDescription("Enter your email address");
  expect(elements.emailInput).toHaveClass("usa-input--error");
};

export const checkForElementFocus = (element: HTMLElement) => {
  expect(element).toHaveFocus();
};

export const checkErrorSummaryDisplay = (elements: ValidationMultipleErrorsElements) => {
  const errorSummary = elements.canvas.queryByRole("alert", { name: /There is a problem/i });
  expect(errorSummary).toBeInTheDocument();
  expect(errorSummary).toHaveClass("usa-alert--error");

  expect(elements.canvas.getByRole("link", { name: /Enter your first name/i })).toBeInTheDocument();
  expect(elements.canvas.getByRole("link", { name: /Enter your last name/i })).toBeInTheDocument();
  expect(
    elements.canvas.getByRole("link", { name: /Enter your email address/i }),
  ).toBeInTheDocument();
};

export const checkErrorSummaryNotDisplayed = (elements: ValidationMultipleErrorsElements) => {
  const errorSummary = elements.canvas.queryByRole("alert", { name: /There is a problem/i });
  expect(errorSummary).not.toBeInTheDocument();
};

export const fillFormPartially = async (elements: ValidationMultipleErrorsElements) => {
  await userEvent.type(elements.firstNameInput, "Jane");
  await userEvent.click(elements.submitButton);

  expect(elements.canvas.queryByText("Enter your first name")).not.toBeInTheDocument();
  expect(elements.canvas.getByText("Enter your last name")).toBeInTheDocument();
  expect(elements.canvas.getByText("Enter your email address")).toBeInTheDocument();

  checkErrorSummaryNotDisplayed(elements);

  checkForElementFocus(elements.lastNameInput);
};

export const fillFormCompletely = async (elements: ValidationMultipleErrorsElements) => {
  await userEvent.type(elements.lastNameInput, "Doe");
  await userEvent.type(elements.emailInput, "jane.doe@example.com");
  await userEvent.click(elements.submitButton);

  expect(elements.canvas.queryByText("Enter your first name")).not.toBeInTheDocument();
  expect(elements.canvas.queryByText("Enter your last name")).not.toBeInTheDocument();
  expect(elements.canvas.queryByText("Enter your email address")).not.toBeInTheDocument();

  checkErrorSummaryNotDisplayed(elements);
};

export const testErrorSummaryLinkFocus = async (elements: ValidationMultipleErrorsElements) => {
  const firstNameLink = elements.canvas.getByRole("link", { name: /Enter your first name/i });
  await userEvent.click(firstNameLink);
  checkForElementFocus(elements.firstNameInput);

  const lastNameLink = elements.canvas.getByRole("link", { name: /Enter your last name/i });
  await userEvent.click(lastNameLink);
  checkForElementFocus(elements.lastNameInput);

  const emailLink = elements.canvas.getByRole("link", { name: /Enter your email address/i });
  await userEvent.click(emailLink);
  checkForElementFocus(elements.emailInput);
};
