"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  imageUrl?: string;
};

export default function ImageUpload({ imageUrl }: ImageUploadProps) {
  const [image, setImage] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="quiosco-next"
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // @ts-ignore
          setImage(result.info?.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2 ">
            <label htmlFor="" className="text-slate-800 ">
              Imagen Producto
            </label>
            <div
              onClick={() => open()}
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {image && (
                <div className="absolute inset=0 w-full h-full">
                  <Image
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                    src={image}
                    alt="Imagen de producto"
                  />
                </div>
              )}
            </div>
          </div>

          {imageUrl && !image && (
            <div className="space-y-2">
              <label htmlFor="">Imagen Actual:</label>
              <div className="relative size-64">
                <Image fill src={getImagePath(imageUrl)} alt="Imagen acrual" />
              </div>
            </div>
          )}

          <input type="hidden" name="image" defaultValue={image || imageUrl} />
        </>
      )}
    </CldUploadWidget>
  );
}
