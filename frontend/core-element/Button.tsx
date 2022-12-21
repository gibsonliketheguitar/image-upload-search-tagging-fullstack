import * as React from "react";
import Text from "./Text";

export type TAriaPressed = {
  string: "true" | "false" | "mixed" | "undefined";
};

enum BUTTONS {
  "default" = "btn-default",
  "outlined" = "btn-outlined",
  "text" = "btn-text",
}

type ButtonType = "button" | "submit" | "rest";

type ButtonProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  title: string;
  type?: ButtonType;
  variant?: keyof typeof BUTTONS;
  onClick?: () => void;
  sx?: string;
} & React.ComponentPropsWithRef<"button">;

//https://uxmovement.com/mobile/optimal-size-and-spacing-for-mobile-buttons/

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { title, icon, variant = "default", sx, ...rest } = props;
    return (
      <button
        ref={ref}
        className={`btn-base btn-mobile btn-desktop ${BUTTONS[variant]} ${sx}`}
        {...rest}
      >
        <span>{icon}</span>
        <Text>{title}</Text>
      </button>
    );
  }
);

export default Button;
