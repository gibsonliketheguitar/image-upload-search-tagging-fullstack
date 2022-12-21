import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

type T_Text = {
  className?: string;
  children: React.ReactNode;
  tabIndex?: number | undefined;
};

//TODO figure out if we can limit tab index to 0 or -1,
//-1 means on reachable

export default function Text({ children, ...rest }: T_Text) {
  return <span {...rest}>{children}</span>;
}
