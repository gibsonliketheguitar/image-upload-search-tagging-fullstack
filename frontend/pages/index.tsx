import Head from "next/head";
import { useEffect, useState } from "react";

import { T_ImageCard } from "core-element/ImageCard";
import ImageList from "core-element/ImageList";
import UploadImgButton from "@component/UploadImgButton";
import { SearchPhoto } from "@component/SearchPhoto";
import { searchPhoto } from "@component/SearchPhoto/api";
import useDebounce from "@component/SearchPhoto/hook";

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
  const [images, setImages] = useState<T_ImageCard[] | []>(dummyData);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 1000)

  useEffect(() => {
    async function getData() {
      const formatQuery = debounceSearch.trim().split(/[ ,]+/).join(',')
      let { data, error } = await searchPhoto(formatQuery)
      if (error) throw new Error(error.message)
      else {
        console.log(data)
      }
    }

    if (debounceSearch.length >= 3) {
      getData().catch(err => console.error(err))
    }
  }, [debounceSearch])

  const handleResetSearch = () => {
    setSearch("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
          <SearchPhoto
            value={search}
            onChange={handleSearchChange}
            reset={handleResetSearch}
          />
          <UploadImgButton />
        </div>
        <ImageList data={images} />
      </main>
    </>
  );
}
