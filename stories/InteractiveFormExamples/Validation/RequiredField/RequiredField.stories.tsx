import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "storybook/test";
import { RequiredFieldMultipleWithAsterisk } from "./RequiredFieldMultipleWithAsterisk";
import { RequiredFieldMultipleNoAsterisk } from "./RequiredFieldMultipleNoAsterisk";
import mdx from "./RequiredField.mdx";

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

    const firstNameInput = canvas.getByLabelText(/First name/);
    const lastNameInput = canvas.getByLabelText(/Last Name/);
    const middleNameInput = canvas.getByLabelText(/Middle name/);
    const submitButton = canvas.getByRole("button", { name: /submit/i });

    await step(
      "Has explanation of asterisks for required fields and asterisks after each required field",
      async () => {
        expect(canvas.getByText(/Required fields are marked with an asterisk/)).toBeInTheDocument();

        const asterisks = canvas.getAllByText("*");
        expect(asterisks.length).toBe(3);
      },
    );

    await step("Required fields have proper required attributes for accessibility", async () => {
      expect(firstNameInput).toHaveAttribute("required");
      expect(lastNameInput).toHaveAttribute("required");
      expect(middleNameInput).not.toHaveAttribute("required");
    });

    await step("Fields do not have initial error state classes", async () => {
      expect(firstNameInput).not.toHaveClass("usa-input--error");
      expect(lastNameInput).not.toHaveClass("usa-input--error");
      expect(middleNameInput).not.toHaveClass("usa-input--error");
    });

    await step("Form validates when empty form is submitted", async () => {
      await userEvent.click(submitButton);

      const firstNameErorrMessage = canvas.getByText("Enter your first name");
      const lastNameErorrMessage = canvas.getByText("Enter your last name");

      expect(firstNameErorrMessage).toBeInTheDocument();
      expect(firstNameErorrMessage).toHaveClass("usa-error-message");

      expect(lastNameErorrMessage).toBeInTheDocument();
      expect(lastNameErorrMessage).toHaveClass("usa-error-message");

      expect(firstNameInput).toHaveFocus();
    });

    await step("Error CSS classes are applied when validation fails", async () => {
      expect(firstNameInput).toHaveClass("usa-input--error");
      expect(lastNameInput).toHaveClass("usa-input--error");
      expect(middleNameInput).not.toHaveClass("usa-input--error");
    });

    await step("Required error validations are cleared by filling input", async () => {
      await userEvent.type(firstNameInput, "Jane");
      await userEvent.click(submitButton);

      expect(canvas.queryByText("Enter your first name")).not.toBeInTheDocument();
      expect(canvas.getByText("Enter your last name")).toBeInTheDocument();

      expect(lastNameInput).toHaveFocus();

      await userEvent.type(lastNameInput, "Doe");
      await userEvent.click(submitButton);

      expect(canvas.queryByText("Enter your last name")).not.toBeInTheDocument();
    });
  },
};

export const WithoutAsterisk: Story = {
  render: RequiredFieldMultipleNoAsterisk,
  name: "Required Fields (without Asterisks)",

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const firstNameInput = canvas.getByLabelText(/First name/);
    const lastNameInput = canvas.getByLabelText(/Last Name/);
    const middleNameInput = canvas.getByLabelText(/Middle name/);
    const submitButton = canvas.getByRole("button", { name: /submit/i });

    await step("Has explanation of how required and optional fields are marked", async () => {
      expect(
        canvas.getByText(/All fields are required unless marked optional/),
      ).toBeInTheDocument();
    });

    await step("Has explicitly marked optional middle name field", async () => {
      expect(
        canvas.getByText(/All fields are required unless marked optional/),
      ).toBeInTheDocument();

      const optionalText = canvas.getAllByText(/optional/);
      expect(optionalText.length).toBe(2);
    });

    await step("Required fields have proper required attributes", async () => {
      expect(firstNameInput).toHaveAttribute("required");
      expect(lastNameInput).toHaveAttribute("required");
      expect(middleNameInput).not.toHaveAttribute("required");
    });

    await step("Fields do not have initial error state classes", async () => {
      expect(firstNameInput).not.toHaveClass("usa-input--error");
      expect(lastNameInput).not.toHaveClass("usa-input--error");
      expect(middleNameInput).not.toHaveClass("usa-input--error");
    });

    await step("Form validates when empty form is submitted", async () => {
      await userEvent.click(submitButton);

      const firstNameErorrMessage = canvas.getByText("Enter your first name");
      const lastNameErorrMessage = canvas.getByText("Enter your last name");

      expect(firstNameErorrMessage).toBeInTheDocument();
      expect(firstNameErorrMessage).toHaveClass("usa-error-message");

      expect(lastNameErorrMessage).toBeInTheDocument();
      expect(lastNameErorrMessage).toHaveClass("usa-error-message");

      expect(firstNameInput).toHaveFocus();
    });

    await step("Error CSS classes are applied when validation fails", async () => {
      expect(firstNameInput).toHaveClass("usa-input--error");
      expect(lastNameInput).toHaveClass("usa-input--error");
      expect(middleNameInput).not.toHaveClass("usa-input--error");
    });

    await step("Required error validations are cleared by filling input", async () => {
      await userEvent.type(firstNameInput, "Jane");
      await userEvent.click(submitButton);

      expect(canvas.queryByText("Enter your first name")).not.toBeInTheDocument();
      expect(canvas.getByText("Enter your last name")).toBeInTheDocument();

      expect(lastNameInput).toHaveFocus();

      await userEvent.type(lastNameInput, "Doe");
      await userEvent.click(submitButton);

      expect(canvas.queryByText("Enter your last name")).not.toBeInTheDocument();
    });
  },
};
