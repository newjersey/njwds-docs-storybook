import { FormEvent } from "react";
import icons from "@newjersey/njwds/dist/img/sprite.svg";
import { useRef, useState } from "react";

export const ValidationOnSubmitSingleError = () => {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [email, setEmail] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email.match(validEmailRegex)) {
      setIsInvalidEmail(true);

      if (inputRef.current != null) {
        inputRef.current.focus();
      }
    } else {
      setIsInvalidEmail(false);
    }
  }

  return (
    <form className="usa-form" onSubmit={onSubmit}>
      <div className={`usa-form-group ${isInvalidEmail ? "usa-form-group--error" : ""}`}>
        <label className={`usa-label ${isInvalidEmail ? "usa-label--error" : ""}`} htmlFor="email">
          Email
        </label>
        <span id="input-hint" className="usa-hint">
          Try submitting without entering a valid email address to trigger a validation error
        </span>
        <input
          className={`usa-input ${isInvalidEmail ? "usa-input--error" : ""}`}
          ref={inputRef}
          aria-describedby={`input-hint ${isInvalidEmail ? "input-error-message" : ""}`}
          aria-invalid={isInvalidEmail ? "true" : "false"}
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        {isInvalidEmail && (
          <div className="nj-error-message-container">
            <svg className="usa-icon" focusable="false" aria-hidden="true" role="img">
              <use xlinkHref={`${icons}#error`}></use>
            </svg>
            <span className="usa-error-message" id="input-error-message" role="alert">
              Please enter a valid email address!
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
