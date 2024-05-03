import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue, Options, GroupBase } from "react-select";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  options: any[];
  status: SingleValue<SelectOption>;
  setStatus: Dispatch<SetStateAction<SingleValue<SelectOption>>>;
};

const SelectField = (props: Props) => {
  return (
    <div className="flex items-center gap-4 ">
      <label htmlFor={props.name} className="">
        {props.label}
      </label>

      <div className="relative w-full">
        <Select
          options={props.options}
          name={props.name}
          id={props.id}
          value={props.status}
          onChange={(option) => props.setStatus(option)}
          isSearchable={false}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "52px",
              cursor: "pointer",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default SelectField;
