import { Field, FieldProps, ErrorMessage } from "formik";
import Image from "next/image";
import { H5 } from "..";

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
        {({ field, meta, form }: FieldProps) => {
          return (
            <div
              {...field}
              className="grid grid-cols-2 gap-2 place-items-center"
            >
              {props.data.map((option, index) => {
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      id={option.value}
                      name={props.name}
                      value={option.value}
                      className="hidden"
                    />

                    <div
                      className={`${field.value.role === option.value ? "border-black border-[2px]" : ""} flex flex-col justify-end h-[238px] bg-ash rounded-lg p-6`}
                    >
                      <Image
                        src={option.img}
                        alt={`${option.value} radio button image`}
                        width={option.iconWidth}
                        height={option.iconHeight}
                        loading="eager"
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
