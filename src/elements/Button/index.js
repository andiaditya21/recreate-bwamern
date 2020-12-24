import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Button = (props) => {
  const className = props.className;

  // logic untuk inject className
  if (props.isPrimary) className.push("btn-primary");
  if (props.isSmall) className.push("btn-sm");
  if (props.isLarge) className.push("btn-lg");
  if (props.isBlock) className.push("btn-block");
  if (props.hasShadow) className.push("btn-shadow");

  // menghandle onClick
  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  // rendering link option (link external (a) or link internal (link))
  if (props.type === "link") {
    // link external (a)
    if (props.isExternal) {
      return (
        <a
          href={props.href}
          className={className.join(" ")}
          style={props.style}
          target={props.target === "_blank" ? "_blank" : undefined}
          rel={props.target === "_blank" ? "noopener noreferrer" : undefined} // noopener & noreferrer, optiomasi SEO
        >
          {props.children}
        </a>
      );
    } else {
      // link internal (link)
      <Link
        to={props.href}
        className={className.join(" ")}
        style={props.style}
        onClick={onClick}
      >
        {props.children}
      </Link>;
    }
  }

  // rendering isDisabled atau isLoading
  if (props.isDisabled || props.isLoading) {
    // inject className "disable"
    if (props.isDisabled) className.push("disabled");
    return (
      <span className={className.join(" ")} style={props.style}>
        {props.isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm mx-5"></span>
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          props.children
        )}
      </span>
    );
  }

  return (
    <button
      className={className.join(" ")}
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: propTypes.oneOf(["button", "link"]), // Button hanya menerima 2 property
  onClick: propTypes.func,
  className: propTypes.string,
  href: propTypes.string,
  target: propTypes.string, // dipakai ketika routing ke external link
  isExternal: propTypes.bool,
  isLoading: propTypes.bool,
  isDisabled: propTypes.bool,
  isSmall: propTypes.bool,
  isLarge: propTypes.bool,
  isBlock: propTypes.bool,
  hasShadow: propTypes.bool,
};

export default Button;
