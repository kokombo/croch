import { icons } from "@/constants";
import TagItem from "../tag-item";
import { useId } from "react";

const TagsList = () => {
  const id = useId();

  return (
    <div
      className="flex items-center overflow-x-auto max-w-full gap-2 lg:gap-4 lg:h-20 h-[70px]"
      style={{ scrollbarWidth: "none" }}
    >
      {[...Array(10)].map((_, index) => {
        return (
          <TagItem
            key={id}
            label="Beanie"
            icon={icons.top}
            activeTab={index === 0}
          />
        );
      })}
    </div>
  );
};

export default TagsList;
