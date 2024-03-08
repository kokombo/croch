import { icons } from "@/constants";
import { Field, ErrorMessage, FieldProps } from "formik";
import Image from "next/image";

type Props = {
  name: string;
  id: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  passwordField?: boolean;
  passwordVisible?: boolean;
  togglePasswordVisibilityIcon?: () => void;
};

const TextField = (props: Props) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="relative w-full">
        <Field name={props.name} id={props.id}>
          {({ field, form, meta }: FieldProps) => {
            return (
              <input
                {...field}
                className="border-grey border-[1px] rounded-lg w-full p-4"
                type={props.type}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
              />
            );
          }}
        </Field>

        <>
          {props.passwordField && (
            <button
              type="button"
              aria-label="password-visibility-icon"
              onClick={props.togglePasswordVisibilityIcon}
              className="absolute right-4 top-4"
            >
              {props.passwordVisible ? (
                <Image
                  src={icons.visibility}
                  alt="hide password icon"
                  height={24}
                  width={24}
                />
              ) : (
                <Image
                  src={icons.visibility}
                  alt="show password icon"
                  height={24}
                  width={24}
                />
              )}
            </button>
          )}
        </>
      </span>

      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red text-sm mt-1"
      />
    </div>
  );
};

export default TextField;
