import { Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
};

const TextArea = (props: Props) => {
  return (
    <div className="relative w-full">
      <label htmlFor={props.name} />

      <Field name={props.name} id={props.id}>
        {({ field, form, meta }: FieldProps) => {
          return (
            <textarea
              {...field}
              className={twMerge(
                "border-grey border-[1px] rounded-lg w-full p-4",
                props.className
              )}
              placeholder={props.placeholder}
              disabled={props.disabled}
              maxLength={props.maxLength}
              autoCorrect="off"
              autoComplete="on"
            />
          );
        }}
      </Field>

      <ErrorMessage
        name={props.name}
        component="div"
        id={props.id}
        className="text-red text-sm font-medium mt-[2px] absolute"
      />
    </div>
  );
};

export default TextArea;
