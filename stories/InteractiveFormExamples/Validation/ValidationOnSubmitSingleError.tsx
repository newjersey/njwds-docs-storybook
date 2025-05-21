import React from "react";
import icons from "@newjersey/njwds/dist/img/sprite.svg";
import { useRef, useState, useEffect } from "react";

export const ValidationOnSubmitSingleError = () => {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  function onClickSubmitButton() {
    if (email.length === 0) {
      setIsInvalidEmail(true);
      setErrorMessage("Please enter an email to proceed!");
    } else if (!email.match(validEmailRegex)) {
      setIsInvalidEmail(true);
      setErrorMessage("Please enter a valid email address!");
    } else {
      setIsInvalidEmail(false);
      setErrorMessage("");
    }
  }

  useEffect(() => {
    if (isInvalidEmail === true && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [isInvalidEmail]);

  return (
    <div className="usa-form">
      <div className={`usa-form-group ${isInvalidEmail ? "usa-form-group--error" : ""}`}>
        <label className={`usa-label ${isInvalidEmail ? "usa-label--error" : ""}`} htmlFor="email">
          Email
          <abbr title="required" className="usa-label--required">
            *
          </abbr>
        </label>
        <span id="input-hint" className="usa-hint">
          Try submitting without entering a valid email address to trigger a validation error
        </span>
        <input
          className={`usa-input ${isInvalidEmail ? "usa-input--error" : ""}`}
          ref={inputRef}
          aria-describedby="input-hint"
          id="email"
          name="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        {isInvalidEmail && (
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

      <button
        className="usa-button blue-override margin-top-2 display-flex flex-row flex-align-items-center"
        onClick={onClickSubmitButton}
      >
        <span>Submit</span>
      </button>
    </div>
  );
};
