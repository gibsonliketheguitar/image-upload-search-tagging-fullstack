import Image from "next/image";

export type T_ImageCard = {
  src: string;
  title: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: object;
  margin?: number;
};

/**
 * Tailwind 1 -> .25 rem -> 4px
 */

export default function ImageCard(props: T_ImageCard) {
  const {
    src,
    title,
    width = 40,
    height = 60,
    borderRadius = 3,
    margin = 2,
    style,
  } = props;
  return (
    <Image
      src={src}
      alt={title + " " + "image"}
      width={width * 4}
      height={height * 4}
      style={{
        borderRadius: `${borderRadius * 4}px`,
        objectFit: "cover",
        margin: `${margin * 4}px`,
        ...style,
      }}
    />
  );
}
