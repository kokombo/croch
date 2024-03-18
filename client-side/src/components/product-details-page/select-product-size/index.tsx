import { useState } from "react";

type Props = {
  data: string[];
};

const SelectProductSize = (props: Props) => {
  const [size, setSize] = useState("");

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
                className="hidden"
                onChange={(e) => setSize(e.target.value)}
              />

              <div
                className={`${size === option ? "border-black border-[2px]" : "border-grey border-[1px]"} flex flex-col items-center justify-center h-10 w-10 rounded-md`}
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
