import * as Label from "@radix-ui/react-label";

type T_Input = {
  defaultValue?: string;
  hidden?: boolean;
  htmlFor: string;
  labelClassName?: string;
  inputClassName?: string;
  id: string;
  placeholder?: string;
  type?: string;
  sx?: string | '';
  value: string;
  onChange: (...args: any) => void;
};

export default function Input(props: T_Input) {
  const {
    defaultValue,
    hidden,
    htmlFor,
    labelClassName,
    inputClassName,
    id,
    onChange,
    type = "text",
    value,
    sx = '',
  } = props;

  //TODO figure out why input stylingis not updating?
  const inputStyle = inputClassName
    ? inputClassName
    : "input-base";

  return (
    <div>
      <Label.Root
        hidden={hidden}
        className={labelClassName}
        htmlFor={htmlFor}
      />
      <input
        className={inputStyle + ' ' + sx}
        type={type}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
