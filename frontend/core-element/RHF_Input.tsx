import * as Label from "@radix-ui/react-label";
import { T_Input } from "./Input";

type T_RHF_Input = T_Input & {
  label?: string;
  accept?: string;
  register?: any;
};

export default function RHF_Input(props: T_RHF_Input) {
  const {
    defaultValue,
    htmlFor,
    label = "",
    labelClassName,
    inputClassName,
    id,
    register,
    type = "text",
    sx = "",
    ...rest
  } = props;

  //TODO figure out why input stylingis not updating?
  const labelStyle = labelClassName ? labelClassName : "input-label-base";
  const inputStyle = inputClassName ? inputClassName : "input-base";

  return (
    <>
      <Label.Root
        hidden={label.length < 1}
        className={labelStyle}
        htmlFor={htmlFor}
      >
        {label}
      </Label.Root>
      <input
        className={inputStyle + " " + sx}
        type={type}
        id={id}
        defaultValue={defaultValue}
        {...register(id)}
        {...rest}
      />
    </>
  );
}
