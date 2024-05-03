import { icons } from "@/constants";
import TagItem from "../tag-item";

type Props = {};

const TagsList = (props: Props) => {
  return (
    <div
      className="flex items-center overflow-x-auto max-w-full gap-2 lg:gap-4 lg:h-20 h-[70px]"
      style={{ scrollbarWidth: "none" }}
    >
      {[...Array(10)].map((_, index) => {
        return (
          <TagItem
            key={index}
            label="Beanie"
            icon={icons.top}
            activeTab={index === 0 ? true : false}
          />
        );
      })}
    </div>
  );
};

export default TagsList;
