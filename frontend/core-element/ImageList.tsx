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
    <section>
      {data.map((ele: T_ImageCard, idx) => {
        return <Card key={idx.toString()} {...ele} />;
      })}
    </section>
  );
}
