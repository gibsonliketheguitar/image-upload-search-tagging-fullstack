import Head from "next/head";
import { useEffect, useState } from "react";

import Button from "core-element/Button";
import { T_ImageCard } from "core-element/ImageCard";
import ImageList from "core-element/ImageList";
import { default as Search } from "core-element/Input";
import UploadImgButton from "@component/UploadImgButton";

export default function Home() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<any>([]);

  const handleResetSearch = () => {
    setSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO ADD RATE LIMITITE
    setSearch(e.target.value);
  }
  async function searchImage() {
    const param = search.trim().split(' ').join('&')
    const BASE_URL = 'https:localhost8000'
    const query = '?search=' + param

    try {
      const response = await fetch(BASE_URL + query)
    }
    catch (error) {
      console.log('failed to find image')
    }
  }
  //Next Step





  useEffect(() => {
    console.log(images)
  }, [images])

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
          <UploadImgButton setImages={setImages} />
        </div>
        <ImageList data={images} />
      </main>
    </>
  );
}