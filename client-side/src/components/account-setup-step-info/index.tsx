type Props = {
  label: string;
  title: string;
  description: string;
  extraClasses?: string;
};

const AccountSetupStepInfo = (props: Props) => {
  return (
    <div className={`${props.extraClasses} flex flex-col gap-6`}>
      <p className="text-neutral">{props.label} </p>
      <h2 className="text-3xl font-bold">{props.title} </h2>
      <p className="text-neutral">{props.description} </p>
    </div>
  );
};

export default AccountSetupStepInfo;
