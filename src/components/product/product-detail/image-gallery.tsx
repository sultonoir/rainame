import { Media } from "@/modules/media/media.types";
import ImageCarouselBasic from "../../ui/image-carousel-basic";

type Props = {
  Images: Media[];
  title: string;
};

const ImageGallery = ({ Images, title }: Props) => {
  const newImages = Images.map((img, i) => ({
    ...img,
    title: title + i,
  }));
  return <ImageCarouselBasic images={newImages} />;
};

export default ImageGallery;
