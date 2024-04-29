import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";

type Props = {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  options: Array<any>;
  status: SingleValue<string>;
  setStatus: Dispatch<SetStateAction<SingleValue<string>>>;
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
          onChange={(value) => props.setStatus(value)}
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
