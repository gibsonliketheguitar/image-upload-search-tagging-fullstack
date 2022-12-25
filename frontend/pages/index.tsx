import Head from "next/head";
import { useState } from "react";

import Button from "core-element/Button";
import { T_ImageCard } from "core-element/ImageCard";
import ImageList from "core-element/ImageList";
import { default as Search } from "core-element/Input";
import UploadImgButton from "@component/UploadImgButton";

const genImages = () => {
  const res: any = []
  for (let i = 0; i < 20; i++) {
    res.push({
      imgURL: `https://picsum.photos/seed/200/400`,
      title: 'test' + i,
      tags: 'test' + i,
    })
  }

  return res
}

const dummyData = genImages()

export default function Home() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<T_ImageCard[] | []>(dummyData);

  const handleResetSearch = () => {
    setSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO ADD RATE LIMITITE
    setSearch(e.target.value);
  };

  const filteredImages = images.filter((ele: any) => {
    if (ele.title.includes(search) || ele.tags.includes(search)) return ele
  })

  return (
    <>
      <Head>
        <title>Image Search App</title>
        <meta name="description" content="Upload and search your image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center">
          <Search
            id="search"
            htmlFor="Input"
            placeholder={"Search for images by title or tags"}
            value={search}
            onChange={handleSearchChange}
            sx={'rounded-md'}
          />
          {/** TODO add icon to clear search field */}
          {search.length > 3 && (
            <Button
              disabled={search.length < 3}
              variant="default"
              title="Reset Search"
              onClick={handleResetSearch}
              sx={"mr-2"}
            />
          )}
          <UploadImgButton />
        </div>
        <ImageList data={filteredImages} />
      </main>
    </>
  );
}
