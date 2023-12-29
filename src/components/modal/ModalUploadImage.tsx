"use client";
import React, { useCallback, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import Cropper from "react-easy-crop";
import { useUploadThing } from "@/lib/uploadthing";
import getCroppedImg from "@/lib/utils";

import { toast } from "sonner";
import { CameraIcon } from "lucide-react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  imageUrl: string;
}

export default function ModalUploadImage({ imageUrl }: Props) {
  const { update, data } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const [rotation, setRotation] = useState<number>(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  //  uploadthing
  const { startUpload } = useUploadThing("media");
  // croped
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // handle coroped
  const onCropComplete = useCallback(
    (
      croppedArea: unknown,
      croppedAreaPixels: React.SetStateAction<{
        x: number;
        y: number;
        width: number;
        height: number;
      } | null>,
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  //handle change image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  //mutate change image user
  const router = useRouter();
  const { mutate } = api.user.updateUser.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Image has change");
      onClose();
      setImage("");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Menjalankan userCroppedImage untuk mendapatkan croppedImage
      let imgCrop = "";
      if (image && croppedAreaPixels) {
        const croppedImg = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation,
        );
        imgCrop = croppedImg ?? "";
      }
      // Mendapatkan blob dari croppedImage
      const blob = await fetch(imgCrop).then((res) => res.blob());

      // Mendapatkan tipe MIME dari blob
      const mimeType = blob.type;

      // Membuat nama file berdasarkan tipe MIME
      const fileExtension = mimeType.split("/")[1];
      const fileName = `file_${Date.now()}.${fileExtension}`;

      // Membuat objek File dari blob dengan nama dan tipe otomatis
      const file = new File([blob], fileName, { type: mimeType });

      let imgUpload = "";
      const imgRes = await startUpload([file]);
      if (imgRes?.at(0)) {
        imgUpload = imgRes.at(0)?.url ?? "";
        await update({ name: data?.user.name, image: imgRes.at(0)?.url });
      }
      mutate({
        imageUrl: imgUpload,
      });
    } catch (error) {
      throw new Error(`${String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        className="group relative h-fit overflow-hidden p-0"
      >
        <div className="absolute z-50 flex h-full w-full  items-center justify-center bg-default-100/30 opacity-0 backdrop-blur-[1px] transition-all group-hover:opacity-100">
          <div className="flex flex-col items-center justify-center text-medium">
            <CameraIcon size={20} />
            Change image
          </div>
        </div>
        <Image
          src={imageUrl || "/Logo.png"}
          alt="profile image"
          width={500}
          height={500}
          radius="sm"
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                upload image
              </ModalHeader>
              <ModalBody>
                <div
                  className={`${
                    image ? "hidden" : ""
                  } relative mx-auto h-auto w-auto`}
                >
                  <Image
                    src={imageUrl || "/Logo.png"}
                    alt="profile image"
                    width={400}
                    height={400}
                  />
                </div>
                <div className={`${!image ? "hidden" : "block"} relative`}>
                  <div className="crop-container">
                    <Cropper
                      image={image || ""}
                      crop={crop}
                      zoom={zoom}
                      rotation={rotation}
                      zoomSpeed={0.1}
                      maxZoom={3}
                      zoomWithScroll={true}
                      showGrid={true}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      onRotationChange={setRotation}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <label
                  htmlFor="upload"
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary-500"
                >
                  Upload image
                </label>
                <input
                  id="upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  color="primary"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onClick={handleSubmit}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
