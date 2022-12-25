import Image from "next/image";

export type T_ImageCard = {
  imgURL: string;
  title: string;
  width?: number;
  height?: number;
  style?: object;
};

/**
 * Tailwind 1 -> .25 rem -> 4px
 */

export default function ImageCard(props: T_ImageCard) {
  const {
    imgURL,
    title,
    width = 40,
    height = 60,
    style,
  } = props;
  return (
    <Image
      fill={false}
      src={imgURL}
      alt={title + " " + "image"}
      width={300}
      height={200}
      className='rounded-lg'
    />
  )
}
