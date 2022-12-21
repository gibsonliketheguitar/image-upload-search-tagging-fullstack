import * as Label from "@radix-ui/react-label";
import { T_Input } from "./Input";

type T_RHF_Input = T_Input & {
    accept?: string;
    register?: any;
}

export default function RHF_Input(props: T_RHF_Input) {
    const {
        accept,
        defaultValue,
        hidden,
        htmlFor,
        labelClassName,
        inputClassName,
        id,
        onChange,
        register,
        type = "text",
        sx = '',
        value,
    } = props;

    //TODO figure out why input stylingis not updating?
    const inputStyle = inputClassName
        ? inputClassName
        : "input-base";

    return (
        <>
            <Label.Root
                hidden={hidden}
                className={labelClassName}
                htmlFor={htmlFor}
            />
            <input
                accept={accept}
                className={inputStyle + ' ' + sx}
                type={type}
                id={id}
                defaultValue={defaultValue}
                onChange={onChange}
                value={value}
                {...register(id)}
            />
        </>
    );
}
