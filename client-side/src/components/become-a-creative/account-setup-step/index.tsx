import { twMerge } from "tailwind-merge";

type Props = {
  active: boolean;
  label: string;
};

const AccountSetupStep = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={twMerge(
          props.active ? "bg-black" : "bg-grey",
          "h-[6px] rounded-lg w-[250px]"
        )}
      />
      <p>{props.label} </p>
    </div>
  );
};

export default AccountSetupStep;
