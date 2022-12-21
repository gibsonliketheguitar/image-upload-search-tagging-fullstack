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
  onChange: (...args: any) => void;
  value: string;
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
  } = props;

  //TODO figure out why input stylingis not updating?
  const inputStyle = inputClassName
    ? inputClassName
    : "border h-10 w-52 leading-4 py-4 px-3 pounded text-white rounded shadow-md";

  return (
    <div>
      <Label.Root
        hidden={hidden}
        className={labelClassName}
        htmlFor={htmlFor}
      />
      <input
        className={inputStyle}
        type={type}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
