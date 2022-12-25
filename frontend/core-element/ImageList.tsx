import { default as Card, T_ImageCard } from "./ImageCard";
import Text from "./Text";

type T_ImageList = {
  data: T_ImageCard[];
};

export default function ImageList(props: T_ImageList) {
  const { data } = props;
  if (data.length < 1)
    return <Text className="text-white">No Images Found</Text>;
  return (
    <section className="grid gap-2 grid-cols-1 sm:grid-cols-2 auto-rows-min">
      {data.map((ele: T_ImageCard, idx) => {
        return <Card key={idx.toString()} width={50} height={20}{...ele} />;
      })}
    </section>
  );
}
