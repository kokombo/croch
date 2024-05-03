import { icons } from "@/constants";
import { Field, FieldProps, ErrorMessage } from "formik";
import Image from "next/image";
import { useState } from "react";

const UploadLogo = () => {
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Field name="logo" id="logo">
          {({ field, form, meta }: FieldProps) => {
            return (
              <label>
                <input
                  type="file"
                  {...field}
                  className="hidden"
                  accept="image/*"
                  value=""
                  onChange={(e) => {
                    const file = e.target.files?.item(0);

                    if (file) {
                      const fileReader = new FileReader();

                      fileReader.onloadend = () => {
                        setImageUrl(fileReader.result);
                      };

                      if (file) {
                        fileReader.readAsDataURL(file);
                      }

                      form.setFieldValue("logo", file);
                    }
                  }}
                />

                <div
                  className="flex items-center justify-center h-[201px] w-[201px] rounded-full border-grey border-[1px] "
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <Image
                    src={icons.uploadphoto}
                    alt="upload photo icon"
                    quality={100}
                    width={32}
                    height={32}
                  />
                </div>
              </label>
            );
          }}
        </Field>

        <label htmlFor="logo" className="text-neutral text-sm">
          Upload your brand logo (max 3mb)
        </label>
      </div>

      <ErrorMessage
        name="logo"
        component="div"
        id="logo"
        className="text-red-700 text-sm mt-[2px] absolute"
      />
    </div>
  );
};

export default UploadLogo;
