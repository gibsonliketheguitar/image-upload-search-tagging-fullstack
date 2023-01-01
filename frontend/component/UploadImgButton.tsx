import React, { useEffect, useReducer, useRef, useState } from "react";
import Image from 'next/image'
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
export default function UploadImgButton(props: any) {
  const [previewImg, setPreviewImg] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false);
  const [tags, setTags] = useState([]);

  const reset = () => {
    setPreviewImg(null)
    setTags([])
    setOpen(false)
  }

  const handleUpload = async (e: any) => {
    e.preventDefault()
    const file = e.target.files[0]
    setPreviewImg(URL.createObjectURL(file))
    const response = await uploadS3(file)
    const result = await genTags(response.key)


    setTags((prev) => {
      const newTags = result.tags.split(',').map((tag: string) => ({ value: tag, label: tag }))
      if (prev.length === 0) {
        return newTags
      }
      else {
        return [...prev, ...newTags]
      }
    })
  }

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

  const genTags = async (s3Key: string) => {
    const URL = process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_PROD_SERVER
    const query = '/tags?key=' + s3Key
    const response = await fetch(URL + query)
    return response.json()
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
    const userTags = tags.map((ele: any) => ele.value).join(",");
    try {
      const URL = process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEV_URL
        : process.env.NEXT_PUBLIC_PROD_SERVER

      //upload image to s3
      const upload = await uploadS3(data.img[0])
      const query = '/tags?key=' + upload.key

      //generate tag with s3 image path
      const genTags = await fetch(URL + query)
      const { tags: moreTags } = await genTags.json()

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

  const handleChange = (e: any) => {
    if (open) {
      reset()
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }

  useEffect(() => {
    console.log('what is tags', tags)
  }, [tags])


  return (
    <Root open={open} onOpenChange={handleChange} >
      <Trigger asChild>
        <Button variant="outlined" title="Upload Image" />
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 opacity-25 bg-black " />
        <Content className="fixed flex flex-col h-full w-full sm:h-auto p-4 mx-auto top-0 md:top-12 inset-x-0 bg-white min-w-xs max-w-md rounded-md overflow-y-auto">
          <div className="flex justify-between items-center overscroll-auto">
            <Title className="flex-1 flex w-full justify-start">
              Upload an Image
            </Title>
            <Close className="flex-0 h-6 w-6" onClick={reset}>
              x
            </Close>
          </div>
          <Form className="flex flex-col" onSubmit={handleSubmit}>
            <RHF_Input label="title" id="title" htmlFor="Input" />

            {previewImg &&
              <div className="flex justify-center bg-gray-300 rounded-md m-2">
                <Image alt='uploaded image' src={previewImg} height={200} width={200} />
              </div>
            }
            <RHF_Input
              id="img"
              inputClassName="btn-base input-field"
              htmlFor="Input"
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
            <InputTags className='m-2 pt-4 pb-12' state={tags} setState={setTags} />

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
