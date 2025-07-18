import React, { FormEvent } from "react";
import icons from "@newjersey/njwds/dist/img/sprite.svg";
import { useRef, useState, useEffect } from "react";

export const ValidationOnSubmitMultipleErrors = () => {
  const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showErrorSummary && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [showErrorSummary]);

  function setFieldFocus(fieldRef: React.RefObject<HTMLInputElement | null>) {
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    let firstInvalidField = null;
    let errorCount = 0;

    if (firstName === "") {
      setIsInvalidFirstName(true);
      firstInvalidField = firstNameInputRef.current;
      errorCount++;
    } else {
      setIsInvalidFirstName(false);
    }

    if (lastName === "") {
      setIsInvalidLastName(true);
      if (!firstInvalidField) {
        firstInvalidField = lastNameInputRef.current;
      }
      errorCount++;
    } else {
      setIsInvalidLastName(false);
    }

    if (email === "") {
      setIsInvalidEmail(true);
      if (!firstInvalidField) {
        firstInvalidField = emailInputRef.current;
      }
      errorCount++;
    } else {
      setIsInvalidEmail(false);
    }

    const shouldShowErrorSummary = errorCount >= 3;
    setShowErrorSummary(shouldShowErrorSummary);

    if (!shouldShowErrorSummary && firstInvalidField) {
      firstInvalidField.focus();
    }
  }

  return (
    <>
      <form className="usa-form" onSubmit={onSubmit} noValidate>
        <fieldset className="usa-fieldset">
          <legend className="usa-legend usa-legend--large">Sign up for notifications</legend>
          {showErrorSummary && (
            <div
              className="usa-alert usa-alert--error margin-bottom-3 border-05 border-top-105 border-secondary-dark"
              role="region"
              aria-labelledby="error-summary-heading"
              tabIndex={-1}
              ref={errorSummaryRef}
            >
              <div className="usa-alert__body">
                <h2 className="usa-alert__heading" id="error-summary-heading">
                  There is a problem
                </h2>

                <ul className="usa-list usa-list--unstyled">
                  {isInvalidFirstName && (
                    <li>
                      <a
                        href="#first-name"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldFocus(firstNameInputRef);
                        }}
                      >
                        Enter your first name
                      </a>
                    </li>
                  )}
                  {isInvalidLastName && (
                    <li>
                      <a
                        href="#last-name"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldFocus(lastNameInputRef);
                        }}
                      >
                        Enter your last name
                      </a>
                    </li>
                  )}
                  {isInvalidEmail && (
                    <li>
                      <a
                        href="#email-address"
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldFocus(emailInputRef);
                        }}
                      >
                        Enter your email address
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

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
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
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
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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

          <div className={`usa-form-group ${isInvalidEmail ? "usa-form-group--error" : ""}`}>
            <label className={"usa-label"} htmlFor="email-address">
              Email Address
              <abbr title="required" className="usa-hint usa-hint--required">
                *
              </abbr>
            </label>
            <input
              className={`usa-input ${isInvalidEmail ? "usa-input--error" : ""}`}
              ref={emailInputRef}
              aria-describedby={`${isInvalidEmail ? "email-address-error-message" : ""}`}
              id="email-address"
              name="email-address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {isInvalidEmail && (
              <div className="nj-error-message-container">
                <svg className="usa-icon" focusable="false" aria-hidden="true" role="img">
                  <use xlinkHref={`${icons}#error`}></use>
                </svg>
                <span className="usa-error-message" id="email-address-error-message" role="alert">
                  Enter your email address
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
