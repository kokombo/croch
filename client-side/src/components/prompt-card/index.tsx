import { DropDown } from "..";
import { CustomButton } from "../buttons";

type Props = {
  prompt: string;
  closeCard: () => void;
  confirm: () => void;
  className?: string;
};

const PromptCard = (props: Props) => {
  return (
    <DropDown className={props.className}>
      <div className="flex flex-col items-center gap-3 ">
        <h4 className="text-sm">{props.prompt}</h4>

        <span className="flex items-center justify-center gap-2">
          <CustomButton
            type="button"
            label="Cancel"
            className="text-sm font-thin  bg-black p-2 text-white"
            onClick={props.closeCard}
          />

          <CustomButton
            type="button"
            label="Delete"
            className="text-sm font-thin bg-red-700 p-2 text-white"
            onClick={props.confirm}
          />
        </span>
      </div>
    </DropDown>
  );
};

export default PromptCard;
