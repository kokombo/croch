import { icons } from "@/constants";
import TagItem from "../tag-item";

const TagsList = () => {
  return (
    <div
      className="flex items-center overflow-x-auto max-w-full gap-2 lg:gap-4 lg:h-20 h-[70px]"
      style={{ scrollbarWidth: "none" }}
    >
      {[...Array(10)].map((_, index) => {
        return (
          <TagItem
            key={index.toString()}
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
