import { DropDown, CustomButton } from "..";

type Props = {
  prompt: string;
  closeCard: () => void;
  confirm: () => void;
  extraClasses?: string;
};

const PromptCard = (props: Props) => {
  return (
    <DropDown extraClasses={props.extraClasses}>
      <div className="flex flex-col items-center gap-3 ">
        <h4 className="text-sm">{props.prompt}</h4>

        <span className="flex items-center justify-center gap-2">
          <CustomButton
            type="button"
            label="Cancel"
            extraClasses="text-xs text-grey3 bg-black p-2 text-white"
            onClick={props.closeCard}
          />

          <CustomButton
            type="button"
            label="Delete"
            extraClasses="text-xs text-grey3 bg-red-700 p-2 text-white"
            onClick={props.confirm}
          />
        </span>
      </div>
    </DropDown>
  );
};

export default PromptCard;
