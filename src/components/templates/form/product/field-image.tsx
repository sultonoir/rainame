import { Button } from "@/components/ui/button";
import useImages from "@/hooks/useImages";
import { UploadCloud, XIcon } from "lucide-react";
import Image from "next/image";
import { type DragEvent } from "react";

interface FieldImageProps {
  values: string[];
  setValues: (values: string[]) => void;
}

const FieldImage = ({ setValues, values }: FieldImageProps) => {
  const { setImages, images } = useImages();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const newFilesArray = Array.from(files);
    const currentImages = images; // State value for images
    const currentValues = values; // State value for values

    // Filter out files that already exist in the current images
    const uniqueNewFiles = newFilesArray.filter(
      (file) =>
        !currentImages.some((existingFile) => existingFile.name === file.name),
    );

    // Generate URLs for unique new files
    const newFileUrls = uniqueNewFiles.map((file) => URL.createObjectURL(file));

    // Filter out URLs that already exist in the current values
    const uniqueNewUrls = newFileUrls.filter(
      (url) => !currentValues.includes(url),
    );

    // Update the state only if there are new unique files or URLs
    if (uniqueNewFiles.length > 0) {
      setImages([...currentImages, ...uniqueNewFiles]);
    }

    if (uniqueNewUrls.length > 0) {
      setValues([...currentValues, ...uniqueNewUrls]);
    }
  };

  return (
    <section className="flex min-h-[150px] gap-4 p-2 md:min-h-[400px] lg:gap-6">
      {images.length === 0 ? (
        <EmptyState
          title="You have no images"
          description="You can start selling as soon as you add a images"
          action={handleFileChange}
        />
      ) : (
        <ImageGrid
          values={values}
          setValues={setValues}
          onUpload={handleFileChange}
        />
      )}
    </section>
  );
};

const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label
    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    htmlFor="upload"
  >
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <input
        type="file"
        multiple
        className="hidden"
        id="upload"
        onChange={action}
      />
    </div>
  </label>
);

const ImageGrid = ({
  values,
  onUpload,
  setValues,
}: {
  values: string[];
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: string[]) => void;
}) => {
  const { setImages, images } = useImages();
  const removeFile = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);

    const newImages = [...images];
    newImages.splice(index, 1);
    // Update state with the filtered array
    setImages(newImages);
    setValues(newValues);
  };

  const handleDragStart = (index: number, event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    targetIndex: number,
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);

    if (sourceIndex !== targetIndex) {
      const newValues = [...values];
      const newImages = [...images];

      const [movedValue] = newValues.splice(sourceIndex, 1);
      newValues.splice(targetIndex, 0, movedValue!);

      const [movedImage] = newImages.splice(sourceIndex, 1);
      newImages.splice(targetIndex, 0, movedImage!);

      setValues(newValues);
      setImages(newImages);
    }
  };

  console.log({ images: images });

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {values.map((src, index) => (
        <div
          key={index}
          className="relative aspect-square cursor-move overflow-hidden rounded-lg"
          draggable
          onDragStart={(e) =>
            handleDragStart(index, e as unknown as DragEvent<HTMLDivElement>)
          }
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(index, e)}
        >
          {index === 0 && (
            <span className="absolute left-1 top-1 rounded-lg bg-blue-100 px-2 py-0.5 text-blue-800">
              Thumbnail
            </span>
          )}
          <Button
            type="button"
            onClick={() => removeFile(index)}
            size="icon"
            className="absolute right-1 top-1 bg-destructive hover:bg-destructive/90"
          >
            <XIcon />
          </Button>

          <Image
            src={src}
            alt={`Image ${index}`}
            layout="responsive"
            width={500}
            height={300}
            className="object-cover"
          />
        </div>
      ))}
      <label
        htmlFor="upload"
        className="relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden border border-dashed"
      >
        <input
          type="file"
          multiple
          id="upload"
          onChange={onUpload}
          className="hidden"
        />
        <UploadCloud size={40} />
        <p className="font-bold capitalize">Upload file</p>
      </label>
    </div>
  );
};

export default FieldImage;
