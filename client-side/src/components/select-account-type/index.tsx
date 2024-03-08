import { Field, FieldProps, ErrorMessage } from "formik";
import Image from "next/image";

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
            <div {...field} className="flex items-center justify-between">
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
                      className={`${field.value.role === option.value ? "border-black border-[2px]" : ""} flex flex-col justify-end h-[238px] w-[238px] bg-ash rounded-lg p-6`}
                    >
                      <Image
                        src={option.img}
                        alt={`${option.value} radio button image`}
                        width={option.iconWidth}
                        height={option.iconHeight}
                      />

                      <p>{option.value} </p>
                    </div>
                  </label>
                );
              })}
            </div>
          );
        }}
      </Field>

      <ErrorMessage name={props.name} component="p" className="" />
    </div>
  );
};

export default SelectAccountType;
