import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@core/Button";

import { useState } from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

//TODO Add animation to give in oomph
export default function UploadImgButton() {
    const [open, setOpen] = useState(false)
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Stop')
        wait().then(() => setOpen(false))
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Button variant="outlined" title="Upload Image" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 opacity-25 bg-black' />
                <Dialog.Content className='fixed flex flex-col m-4 p-2 mx-auto inset-x-0 bg-white min-w-xs max-w-md rounded-md'>
                    <Dialog.Close className='flex w-full justify-end'>
                        <span className='mr-2'>x</span>
                    </Dialog.Close>
                    <Dialog.Title className='flex w-full justify-start'> Upload an Image</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <Button variant='default' title='Upload' type="submit" />
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}
