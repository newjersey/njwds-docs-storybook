import { expect, userEvent } from "storybook/test";

export const getValidationSingleErrorElements = (canvas: any) => ({
  emailInput: canvas.getByLabelText(/Email/),
  submitButton: canvas.getByRole("button", { name: /Submit/ }),
  canvas,
});

export interface ValidationSingleErrorElements {
  emailInput: HTMLElement;
  submitButton: HTMLElement;
  canvas: any;
}

export const checkSingleErrorInitialState = (elements: ValidationSingleErrorElements) => {
  expect(elements.emailInput).not.toHaveClass("usa-input--error");
  expect(elements.emailInput).not.toHaveAttribute("aria-invalid", "true");

  const errorMessage = elements.canvas.queryByText("Please enter a valid email address!");
  expect(errorMessage).not.toBeInTheDocument();
};

export const fillOutEmailAndSubmitEmailForm = async (
  elements: ValidationSingleErrorElements,
  email: string,
) => {
  await userEvent.clear(elements.emailInput);
  await userEvent.type(elements.emailInput, email);
  await userEvent.click(elements.submitButton);
};

export const expectsSingleFieldEmailInputToBeInvalid = (
  elements: ValidationSingleErrorElements,
) => {
  const errorMessage = elements.canvas.getByText("Please enter a valid email address!");
  expect(errorMessage).toBeInTheDocument();
  expect(elements.emailInput).toHaveClass("usa-input--error");
  expect(elements.emailInput).toHaveAttribute("aria-invalid", "true");
  expect(elements.emailInput).toHaveFocus();
};

export const expectsSingleFieldEmailInputToBeValid = (elements: ValidationSingleErrorElements) => {
  const errorMessage = elements.canvas.queryByText("Please enter a valid email address!");
  expect(errorMessage).not.toBeInTheDocument();
  expect(elements.emailInput).not.toHaveClass("usa-input--error");
  expect(elements.emailInput).not.toHaveAttribute("aria-invalid", "true");
};
