import { icons } from "@/constants";
import { Field, FieldProps } from "formik";
import Image from "next/image";

const UploadLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Field name="logo" id="logo">
        {({ field, form, meta }: FieldProps) => {
          return (
            <label>
              <input type="file" {...field} className="hidden" />
              <div className="flex items-center justify-center h-[201px] w-[201px] rounded-full bg-grey border-[1px]">
                <Image
                  src={icons.uploadphoto}
                  alt="upload photo icon"
                  width={32}
                  height={32}
                />
              </div>
            </label>
          );
        }}
      </Field>

      <label htmlFor="logo">Brand Logo</label>
    </div>
  );
};

export default UploadLogo;
