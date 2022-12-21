import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form';
import RHF_Input from './RHF_Input';

type TForm = {
    className: string
    defaultValues?: any
    children?: React.ReactNode,
    onSubmit: (data: any) => void
}

export default function Form(props: TForm) {
    const { className, defaultValues, children, onSubmit } = props
    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;
    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            {React.Children.map(children, (child) => {
                let result = child
                if (React.isValidElement(child) && (child as ReactElement<any>).type === RHF_Input) {
                    result = React.createElement(child.type, {
                        register: methods.register,
                        ...child.props,
                    })
                }
                return result
            })}
        </form>
    );
}