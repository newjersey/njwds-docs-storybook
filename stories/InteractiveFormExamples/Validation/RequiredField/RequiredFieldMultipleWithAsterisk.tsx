import { FormEvent } from "react";
import icons from "@newjersey/njwds/dist/img/sprite.svg";
import { useRef, useState } from "react";

export const RequiredFieldMultipleWithAsterisk = () => {
  const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [firstName, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    let firstInvalidField = null;

    if (firstName === "") {
      setIsInvalidFirstName(true);
      firstInvalidField = firstNameInputRef.current;
    } else {
      setIsInvalidFirstName(false);
    }

    if (lastName === "") {
      setIsInvalidLastName(true);
      if (!firstInvalidField) {
        firstInvalidField = lastNameInputRef.current;
      }
    } else {
      setIsInvalidLastName(false);
    }

    if (firstInvalidField != null) {
      firstInvalidField.focus();
    }
  }

  return (
    <>
      <form className="usa-form" onSubmit={onSubmit} noValidate>
        <fieldset className="usa-fieldset">
          <legend className="usa-legend usa-legend--large">
            Applicant information
            <span className="usa-hint display-block margin-top-1">
              Required fields are marked with an asterisk (
              <abbr title="required" className="usa-hint usa-hint--required">
                *
              </abbr>
              )
            </span>
          </legend>

          <div className={`usa-form-group ${isInvalidFirstName ? "usa-form-group--error" : ""}`}>
            <label
              className={`usa-label ${isInvalidFirstName ? "usa-label--error" : ""}`}
              htmlFor="first-name"
            >
              First name
              <abbr title="required" className="usa-hint usa-hint--required">
                *
              </abbr>
            </label>
            <input
              className={`usa-input ${isInvalidFirstName ? "usa-input--error" : ""}`}
              ref={firstNameInputRef}
              aria-describedby={`${isInvalidFirstName ? "first-name-error-message" : ""}`}
              aria-invalid={isInvalidFirstName ? "true" : "false"}
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your first name"
              autoComplete="given-name"
              required
            />
            {isInvalidFirstName && (
              <div className="nj-error-message-container">
                <svg className="usa-icon" focusable="false" aria-hidden="true" role="img">
                  <use xlinkHref={`${icons}#error`}></use>
                </svg>
                <span className="usa-error-message" id="first-name-error-message" role="alert">
                  Enter your first name
                </span>
              </div>
            )}
          </div>

          <label className={"usa-label"} htmlFor="middle-name">
            Middle name
          </label>
          <input
            className={"usa-input"}
            id="middle-name"
            name="middle-name"
            value={middleName}
            onChange={(event) => setMiddleName(event.target.value)}
            placeholder="Enter your middle name"
            autoComplete="additional-name"
          />

          <div className={`usa-form-group ${isInvalidLastName ? "usa-form-group--error" : ""}`}>
            <label
              className={`usa-label ${isInvalidLastName ? "usa-label--error" : ""}`}
              htmlFor="last-name"
            >
              Last name
              <abbr title="required" className="usa-hint usa-hint--required">
                *
              </abbr>
            </label>
            <input
              className={`usa-input ${isInvalidLastName ? "usa-input--error" : ""}`}
              ref={lastNameInputRef}
              aria-describedby={`${isInvalidLastName ? "last-name-error-message" : ""}`}
              aria-invalid={isInvalidLastName ? "true" : "false"}
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter your last name"
              autoComplete="family-name"
              required
            />
            {isInvalidLastName && (
              <div className="nj-error-message-container">
                <svg className="usa-icon" focusable="false" aria-hidden="true" role="img">
                  <use xlinkHref={`${icons}#error`}></use>
                </svg>
                <span className="usa-error-message" id="last-name-error-message" role="alert">
                  Enter your last name
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="usa-button blue-override margin-top-2 display-flex flex-row flex-align-items-center"
          >
            <span>Submit</span>
          </button>
        </fieldset>
      </form>
    </>
  );
};
