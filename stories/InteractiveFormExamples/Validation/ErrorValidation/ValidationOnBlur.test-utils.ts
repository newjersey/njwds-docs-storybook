import { expect, userEvent } from "storybook/test";

export const getValidationOnBlurElements = (canvas: any) => ({
  passwordInput: canvas.getByLabelText(/Enter password/),
  submitButton: canvas.getByRole("button", { name: /Submit/ }),
  canvas,
});

export interface ValidationOnBlurElements {
  passwordInput: HTMLElement;
  submitButton: HTMLElement;
  canvas: any;
}

export const checkInitialPasswordState = (elements: ValidationOnBlurElements) => {
  expect(elements.passwordInput).not.toHaveClass("usa-input--error");
  expect(elements.passwordInput).not.toHaveAttribute("aria-invalid", "true");

  expect(elements.canvas.getByText("Passwords must contain:")).toBeInTheDocument();
  expect(elements.canvas.getByText("A lowercase letter")).toBeInTheDocument();
  expect(elements.canvas.getByText("An uppercase letter")).toBeInTheDocument();
  expect(elements.canvas.getByText("A number")).toBeInTheDocument();
  expect(elements.canvas.getByText("At least 8 characters")).toBeInTheDocument();

  const errorMessage = elements.canvas.queryByRole("alert");
  expect(errorMessage).not.toBeInTheDocument();
};

export const checkPasswordValidationOnBlur = async (
  elements: ValidationOnBlurElements,
  password: string,
  expectedError: string,
) => {
  await userEvent.clear(elements.passwordInput);

  if (password !== "") {
    await userEvent.type(elements.passwordInput, password);
  }
  await userEvent.tab();

  const errorMessage = elements.canvas.getByText(expectedError);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveClass("usa-error-message");
  expect(elements.passwordInput).toHaveClass("usa-input--error");
  expect(elements.passwordInput).toHaveAttribute("aria-invalid", "true");
  expect(elements.passwordInput).toHaveAccessibleDescription(new RegExp(expectedError));
};

export const checkPasswordValidationOnSubmit = async (
  elements: ValidationOnBlurElements,
  password: string,
  expectedError: string,
) => {
  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, password);
  await userEvent.click(elements.submitButton);

  const errorMessage = elements.canvas.getByText(expectedError);
  expect(errorMessage).toBeInTheDocument();
  expect(elements.passwordInput).toHaveClass("usa-input--error");
  expect(elements.passwordInput).toHaveAttribute("aria-invalid", "true");
};

export const checkValidPasswordSubmission = async (elements: ValidationOnBlurElements) => {
  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, "ValidPass123");
  await userEvent.click(elements.submitButton);

  const errorMessage = elements.canvas.queryByRole("alert");
  expect(errorMessage).not.toBeInTheDocument();
  expect(elements.passwordInput).not.toHaveClass("usa-input--error");
  expect(elements.passwordInput).not.toHaveAttribute("aria-invalid", "true");
};
