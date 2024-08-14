import { Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";
import Image from "next/image";
import { H5 } from "../..";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  data: AccountType[];
  label: string;
};

const SelectAccountType = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="role">{props.label} </label>

      <Field>
        {({ field }: FieldProps) => {
          return (
            <div
              {...field}
              className="grid grid-cols-2 gap-2 md:gap-4 place-items-center"
            >
              {props.data.map((option, index) => {
                return (
                  <label key={`${index}-${option.value}`}>
                    <input
                      type="radio"
                      id={props.name}
                      name={props.name}
                      value={option.value}
                      className="hidden"
                    />

                    <div
                      className={twMerge(
                        "flex flex-col items-center justify-end gap-1 bg-ash rounded-lg p-6",
                        field.value.role === option.value
                          ? "border-black border-[2px]"
                          : ""
                      )}
                    >
                      <Image
                        src={option.img}
                        alt={`${option.value} radio button image`}
                        width={150}
                        height={150}
                        loading="eager"
                        className="w-56 h-36 object-contain"
                      />

                      <H5 extraClasses="capitalize"> {option.value} </H5>
                    </div>
                  </label>
                );
              })}
            </div>
          );
        }}
      </Field>

      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-700 absolute mt-1 text-sm"
      />
    </div>
  );
};

export default SelectAccountType;
