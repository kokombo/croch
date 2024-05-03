import { Dispatch, SetStateAction } from "react";

type Props = {
  data: string[];
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  defaultChecked?: boolean;
};

const SelectProductSize = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="size">Available Sizes</label>

      <div className="grid grid-cols-4 gap-1 place-items-center">
        {props.data.map((option, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                id={option}
                name="size"
                value={option}
                defaultChecked={props.defaultChecked}
                className="hidden"
                onChange={(e) => props.setSize(e.target.value)}
              />

              <div
                className={`${props.size === option ? "border-black border-[2px]" : "border-grey border-[1px]"} flex flex-col items-center justify-center h-10 w-10 rounded-md`}
              >
                <p>
                  {option === "small"
                    ? "S"
                    : option === "medium"
                      ? "M"
                      : option === "large"
                        ? "L"
                        : option === "extraLarge"
                          ? "XL"
                          : ""}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectProductSize;
