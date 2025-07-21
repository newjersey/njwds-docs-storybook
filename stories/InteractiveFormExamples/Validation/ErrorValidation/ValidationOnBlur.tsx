import React, { FormEvent } from "react";
import icons from "@newjersey/njwds/dist/img/sprite.svg";
import { useRef, useState } from "react";

export const ValidationOnBlur = () => {
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const validatePassword = (value: string) => {
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasMinLength = value.length >= 8;

    if (!value) {
      setErrorMessage("Please enter a password");
      return false;
    }

    if (!hasMinLength) {
      setErrorMessage("Password is too short");
      return false;
    }

    if (!hasLowercase) {
      setErrorMessage("Password must contain a lowercase letter");
      return false;
    }

    if (!hasUppercase) {
      setErrorMessage("Password must contain an uppercase letter");
      return false;
    }

    if (!hasNumber) {
      setErrorMessage("Password must contain a number");
      return false;
    }

    return true;
  };

  function onBlur(): void {
    const isValid = validatePassword(password);
    setIsInvalidPassword(!isValid);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validatePassword(password)) {
      setIsInvalidPassword(true);

      if (inputRef.current != null) {
        inputRef.current.focus();
      }
    } else {
      setIsInvalidPassword(false);
    }
  }

  return (
    <form className="usa-form" onSubmit={onSubmit} noValidate>
      <div className={`usa-form-group ${isInvalidPassword ? "usa-form-group--error" : ""}`}>
        <label
          className={`usa-label ${isInvalidPassword ? "usa-label--error" : ""}`}
          htmlFor="password"
        >
          Enter password
        </label>
        <div className="usa-hint margin-top-2" id="password-hint">
          <p>
            For this example, the password will not be obfuscated. Please try to submit the form
            without entering a valid password to trigger a validation error.{" "}
          </p>
          <p> Passwords must contain:</p>
          <ul className="usa-list margin-top-05">
            <li>At least 8 characters</li>
            <li>A lowercase letter</li>
            <li>An uppercase letter</li>
            <li>A number</li>
          </ul>
        </div>
        <input
          className={`usa-input ${isInvalidPassword ? "usa-input--error" : ""}`}
          ref={inputRef}
          aria-describedby={`${isInvalidPassword ? "input-error-message" : ""}`}
          aria-invalid={isInvalidPassword ? "true" : "false"}
          id="password"
          name="password"
          value={password}
          // type is omitted below to allow user to see the password in plain text
          //   type="password"
          onBlur={onBlur}
          onChange={(event) => setPassword(event.target.value)}
          required
        ></input>
        {isInvalidPassword && (
          <div className="nj-error-message-container">
            <svg className="usa-icon" focusable="false" aria-hidden="true" role="img">
              <use xlinkHref={`${icons}#error`}></use>
            </svg>
            <span className="usa-error-message" id="input-error-message" role="alert">
              {errorMessage}
            </span>
          </div>
        )}
      </div>

      <button className="usa-button blue-override margin-top-2 display-flex flex-row flex-align-items-center">
        <span>Submit</span>
      </button>
    </form>
  );
};
