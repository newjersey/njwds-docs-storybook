import { expect, userEvent } from "storybook/test";

export const getRequiredFieldStoryElements = (canvas: any) => ({
  firstNameInput: canvas.getByLabelText(/First name/),
  lastNameInput: canvas.getByLabelText(/Last name/),
  middleNameInput: canvas.getByLabelText(/Middle name/),
  submitButton: canvas.getByRole("button", { name: /Submit/ }),
  canvas,
});

export interface RequiredFieldElements {
  firstNameInput: HTMLElement;
  lastNameInput: HTMLElement;
  middleNameInput: HTMLElement;
  submitButton: HTMLElement;
  canvas: any;
}

export const checkAccessibleFieldAndButtonNames = async (elements: RequiredFieldElements) => {
  expect(elements.firstNameInput).toHaveAccessibleName(/First name/);
  expect(elements.lastNameInput).toHaveAccessibleName(/Last name/);
  expect(elements.middleNameInput).toHaveAccessibleName(/Middle name/);
  expect(elements.submitButton).toHaveAccessibleName(/Submit/);
};

export const checkFieldRequiredAttributes = async (elements: RequiredFieldElements) => {
  expect(elements.firstNameInput).toBeRequired();
  expect(elements.firstNameInput).toHaveAccessibleName();
  expect(elements.lastNameInput).toBeRequired();
  expect(elements.middleNameInput).not.toBeRequired();
};

export const checkInitialErrorStateClassAndAriaInvalid = (elements: RequiredFieldElements) => {
  expect(elements.firstNameInput).not.toHaveClass("usa-input--error");
  expect(elements.lastNameInput).not.toHaveClass("usa-input--error");
  expect(elements.middleNameInput).not.toHaveClass("usa-input--error");

  expect(elements.firstNameInput).not.toHaveAttribute("aria-invalid", "true");
  expect(elements.lastNameInput).not.toHaveAttribute("aria-invalid", "true");
  expect(elements.middleNameInput).not.toHaveAttribute("aria-invalid", "true");
};

export const checkFormElementsForEmptyFormSubmission = async (elements: RequiredFieldElements) => {
  await userEvent.click(elements.submitButton);
  const firstNameErrorMessage = elements.canvas.queryByText("Enter your first name");
  const lastNameErrorMessage = elements.canvas.queryByText("Enter your last name");

  expect(firstNameErrorMessage).toBeInTheDocument();
  expect(firstNameErrorMessage).toHaveClass("usa-error-message");
  expect(elements.firstNameInput).toHaveAccessibleDescription("Enter your first name");
  expect(elements.firstNameInput).toHaveClass("usa-input--error");
  expect(elements.firstNameInput).toHaveAttribute("aria-invalid", "true");

  expect(lastNameErrorMessage).toBeInTheDocument();
  expect(lastNameErrorMessage).toHaveClass("usa-error-message");
  expect(elements.lastNameInput).toHaveAccessibleDescription("Enter your last name");
  expect(elements.lastNameInput).toHaveClass("usa-input--error");
  expect(elements.lastNameInput).toHaveAttribute("aria-invalid", "true");

  expect(elements.middleNameInput).not.toHaveClass("usa-input--error");
  expect(elements.middleNameInput).not.toHaveAttribute("aria-invalid", "true");
};

export const checkForElementFocus = (element: HTMLElement) => {
  expect(element).toHaveFocus();
};

export const fillAndSubmitForm = async (elements: RequiredFieldElements) => {
  await userEvent.type(elements.firstNameInput, "Jane");
  await userEvent.click(elements.submitButton);

  expect(elements.canvas.queryByText("Enter your first name")).not.toBeInTheDocument();
  expect(elements.canvas.getByText("Enter your last name")).toBeInTheDocument();

  expect(elements.lastNameInput).toHaveFocus();

  await userEvent.type(elements.lastNameInput, "Doe");
  await userEvent.click(elements.submitButton);

  expect(elements.canvas.queryByText("Enter your last name")).not.toBeInTheDocument();
};
