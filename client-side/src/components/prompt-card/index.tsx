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
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-sm">{props.prompt}</h4>

        <span className="flex items-center justify-center gap-2">
          <CustomButton
            type="button"
            label="Return"
            extraClasses="text-[12px] text-grey3 bg-black px-2 py-1 text-white"
            onClick={props.closeCard}
          />

          <CustomButton
            type="button"
            label="Delete"
            extraClasses="text-[12px] text-grey3 bg-red-700 px-2 py-1 text-white"
            onClick={props.confirm}
          />
        </span>
      </div>
    </DropDown>
  );
};

export default PromptCard;
