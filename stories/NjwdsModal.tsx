import React from "react";
import icons from "../node_modules/@newjersey/njwds/dist/img/sprite.svg";

export const NjwdsModal = () => {
  return (
    <div className="padding-1">
      <button className="usa-button" aria-controls="example-modal" data-open-modal>
        Open default modal
      </button>
      <div
        className="usa-modal "
        id="example-modal"
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
      >
        <div className="usa-modal__content">
          <div className="usa-modal__main">
            <h1 className="usa-modal__heading" id="modal-heading">
              Are you sure you want to continue?
            </h1>
            <div className="usa-prose">
              <p id="modal-description">You have unsaved changes that will be lost.</p>
            </div>
            <div className="usa-modal__footer">
              <ul className="usa-button-group">
                <li className="usa-button-group__item">
                  <button type="button" className="usa-button" data-close-modal>
                    Continue without saving
                  </button>
                </li>
                <li className="usa-button-group__item">
                  <button
                    type="button"
                    className="usa-button usa-button--unstyled padding-105 text-center"
                    data-close-modal
                  >
                    Go back
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            data-close-modal
          >
            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
              <use href={`${icons}#close`}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
