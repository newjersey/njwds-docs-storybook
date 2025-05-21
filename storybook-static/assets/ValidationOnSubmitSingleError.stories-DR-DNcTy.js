import { r as l, R as e } from "./index-D4lIrffr.js";
const g = "" + new URL("sprite-BJHKCx_5.svg", import.meta.url).href,
  c = () => {
    const [a, t] = l.useState(!1),
      [n, u] = l.useState(""),
      [d, s] = l.useState(""),
      p = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    function E() {
      n.length === 0
        ? (t(!0), s("Please enter an email to proceed!"))
        : n.match(p)
          ? (t(!1), s(""))
          : (t(!0), s("Please enter a valid email address!"));
    }
    return e.createElement(
      "form",
      { className: "usa=form" },
      e.createElement(
        "div",
        { className: `usa-form-group ${a ? "usa-form-group--error" : ""}` },
        e.createElement(
          "label",
          { className: `usa-label ${a ? "usa-label--error" : ""}`, htmlFor: "email" },
          "Email",
          e.createElement("abbr", { title: "required", className: "usa-label--required" }, "*"),
        ),
        e.createElement("input", {
          className: `usa-input ${a ? "usa-input--error" : ""}`,
          id: "email",
          name: "email",
          required: !0,
          onChange: (f) => u(f.target.value),
        }),
        a &&
          e.createElement(
            "div",
            { className: "nj-error-message-container" },
            e.createElement(
              "svg",
              { className: "usa-icon", focusable: "false", "aria-hidden": "true", role: "img" },
              e.createElement("use", { xlinkHref: `${g}#error` }),
            ),
            e.createElement(
              "span",
              { className: "usa-error-message", id: "input-error-message", role: "alert" },
              d,
            ),
          ),
      ),
      e.createElement(
        "button",
        {
          className:
            "usa-button blue-override margin-top-2 display-flex flex-row flex-align-items-center",
          onClick: E,
        },
        e.createElement("span", null, "Submit"),
      ),
    );
  };
c.__docgenInfo = { description: "", methods: [], displayName: "ValidationOnSubmitSingleError" };
const v = {
    title: "Interactive Form Examples/Validation/Validation on Submit (with One Error)",
    component: c,
  },
  r = {};
var i, o, m;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((i = r.parameters) == null ? void 0 : i.docs),
    source: {
      originalSource: "{}",
      ...((m = (o = r.parameters) == null ? void 0 : o.docs) == null ? void 0 : m.source),
    },
  },
};
const S = ["Default"];
export { r as Default, S as __namedExportsOrder, v as default };
