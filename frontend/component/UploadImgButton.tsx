import React, { useEffect, useState } from "react";
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
import Form from "@core/Form";
import RHF_Input from "@core/RHF_Input";
import InputTags from "@component/InputTags";


//TODO Add animation to give in oomph
export default function UploadImgButton() {
  const [open, setOpen] = useState<boolean>(false);
  const [tag, setTag] = useState([]);

  const getSignedUrl = async () => {
    const url = process.env.NEXT_PUBLIC_AWS_SIGNED_URL as string
    const response = await fetch(url)
    return await response.json()
  }

  const uploadS3 = async (file: any) => {
    const { uploadURL, key } = await getSignedUrl()
    console.log('uploadURl', uploadURL)
    //TODO figure out how to use wild card to capture all type of picture or enforce png only
    //TODO figure how to use new BLob
    //const blobData = new Blob([new Uint8Array(file)], { type: 'image/png' })
    const result = await fetch(uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'images/png'
      },
      body: file
      //body: blobData
    })
    if (!result.ok) throw new Error('Failed to upload image')
    return { key }
  }

  const saveRecord = async (payload: any) => {
    const URL = process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_PROD_SERVER
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
    const userTags = tag.map((ele: any) => ele.value).join(",");
    try {
      const URL = process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEV_URL
        : process.env.NEXT_PUBLIC_PROD_SERVER

      console.log('what is URL', URL)
      //upload image to s3
      const upload = await uploadS3(data.img[0])
      const query = '/tags?key=' + upload.key

      //generate tag with s3 image path
      const genTags = await fetch(URL + query)
      const { tags: moreTags } = await genTags.json()
      console.log('what is more tags', moreTags)

      const save = await saveRecord({
        title: data.title,
        s3Key: upload.key,
        tags: userTags.concat(',', moreTags),

      })

      console.log('save', save)
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <Button variant="outlined" title="Upload Image" />
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 opacity-25 bg-black" />
        <Content className="fixed flex flex-col m-4 p-3 top-12 mx-auto inset-x-0 bg-white min-w-xs max-w-md rounded-md">
          <div className="flex justify-between items-center">
            <Title className="flex-1 flex w-full justify-start">
              Upload an Image
            </Title>
            <Close className="flex-0 h-6 w-6">
              x
            </Close>
          </div>
          <Form className="flex flex-col" onSubmit={handleSubmit}>
            <RHF_Input label="title" id="title" htmlFor="Input" />
            <RHF_Input label="tags" id="tags" htmlFor="Input" />
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
