import React from "react";
import {
  Trigger,
  Root,
  Portal,
  Content,
  Close,
  Title,
  Overlay,
} from "@radix-ui/react-dialog";
import Button from "@core/Button";

import { useState } from "react";
import Form from "@core/Form";
import Input from "@core/Input";
import RHF_Input from "@core/RHF_Input";
import InputTags from "@component/InputTags";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

//TODO Add animation to give in oomph
export default function UploadImgButton() {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState([]);

  const getSignedUrl = async () => {
    const url = 'https://2mziu1ezol.execute-api.us-west-1.amazonaws.com/v1/getSignedUrl'
    const response = await fetch(url)
    return await response.json()
  }

  const uploadS3 = async (file: any) => {
    const { uploadURL, key } = await getSignedUrl()
    //TODO figure out how to use wild card to capture all type of picture or enforce png only
    const blobData = new Blob([new Uint8Array(file)], { type: file[0].type })
    const result = await fetch(uploadURL, { method: 'PUT', body: blobData })
    if (!result.ok) throw new Error('Failed to upload image')

    return { key }
  }

  const saveRecord = async (payload: any) => {
    const URL = 'http://localhost:8000'
    const query = '/photo'

    const response = await fetch(URL + query, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return await response.json()
  }

  const handleSubmit = async (data: any) => {
    const tags = tag.map((ele: any) => ele.value).join(",");
    try {
      const upload = await uploadS3(data.img)
      const save = await saveRecord({
        title: data.title,
        s3Key: upload.key,
        tags,
      })
      console.log(save)
    }
    catch (error) {
      console.log(error)
    }

    wait().then(() => setOpen(false));
  };

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger>
        <Button variant="outlined" title="Upload Image" />
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 opacity-25 bg-black" />
        <Content className="fixed flex flex-col m-4 p-3 mx-auto inset-x-0 bg-white min-w-xs max-w-md rounded-md">
          <div className="flex justify-between items-center">
            <Title className="flex-1 flex w-full justify-start">
              Upload an Image
            </Title>
            <Close className="flex-0">
              <span>x</span>
            </Close>
          </div>
          <Form className="flex flex-col" onSubmit={handleSubmit}>
            <RHF_Input label="title" id="title" htmlFor="Input" />
            <RHF_Input label="title" id="tags" htmlFor="Input" />
            <RHF_Input
              id="img"
              inputClassName="btn-base input-field"
              htmlFor="Input"
              type="file"
              accept="image/*"
            />
            <InputTags className='m-2 pt-4 pb-12' state={tag} setState={setTag} />

            <Button
              key="submit"
              variant="default"
              title="Upload"
              type="submit"
            />
          </Form>
        </Content>
      </Portal>
    </Root>
  );
}
