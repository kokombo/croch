import { Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";

type Props = {
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  extraClasses?: string;
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
              className={`${props.extraClasses} border-grey border-[1px] rounded-lg w-full p-4`}
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
