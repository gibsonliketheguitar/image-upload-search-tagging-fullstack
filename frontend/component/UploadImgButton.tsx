import React from "react";
import { Trigger, Root, Portal, Content, Close, Title, Overlay } from "@radix-ui/react-dialog";
import Button from "@core/Button";

import { useState } from "react";
import Form from "@core/Form";
import Input from "@core/Input";
import RHF_Input from "@core/RHF_Input";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

//TODO Add animation to give in oomph
export default function UploadImgButton() {
    const [img, setImg] = useState(null)
    const [open, setOpen] = useState(false)

    const handleFileUpload = (e: any) => {
        e.preventDefault()

        const file: any = e.target.files;
        if (file.length === 0) return;
        if (file) setImg(file[0]);

    }

    const handleSubmit = (data: any) => {
        console.log(data, img)
        wait().then(() => setOpen(false))
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <Trigger>
                <Button variant="outlined" title="Upload Image" />
            </Trigger>
            <Portal>
                <Overlay className='fixed inset-0 opacity-25 bg-black' />
                <Content className='fixed flex flex-col m-4 p-2 mx-auto inset-x-0 bg-white min-w-xs max-w-md rounded-md'>
                    <Close className='flex w-full justify-end'>
                        <span className='mr-2'>x</span>
                    </Close>
                    <Title className='flex w-full justify-start'> Upload an Image</Title>
                    <Input id='upload-input' htmlFor="Input" onChange={handleFileUpload} sx={'hidden'} />
                    <Form className='flex flex-col' onSubmit={handleSubmit}>
                        <RHF_Input id='title' htmlFor="Input" />
                        <RHF_Input id='tags' htmlFor="Input" />
                        <RHF_Input
                            id='imgFile'
                            inputClassName='btn-base input-field'
                            htmlFor="Input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />

                        <Button key='submit' variant='default' title='Upload' type="submit" />
                    </Form>
                </Content>
            </Portal>
        </Root >
    );
}
