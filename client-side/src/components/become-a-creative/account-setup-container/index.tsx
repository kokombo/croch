import AccountSetupStep from "../account-setup-step";

type Props = {
  step: number;
};

const AccountSetupContainer = (props: Props) => {
  return (
    <section className="flex_center justify-between paddingX border-b-[1px] border-grey h-40">
      <span className="flex flex-col gap-2">
        <p className="text-3xl font-bold">Set Up Your Account</p>

        <p>Complete your account setup in just 3 steps</p>
      </span>

      <div className="flex items-center gap-2">
        <AccountSetupStep label="Step 1" active={props.step === 1} />

        <AccountSetupStep label="Step 2" active={props.step === 2} />

        <AccountSetupStep label="Step 3" active={props.step === 3} />
      </div>
    </section>
  );
};

export default AccountSetupContainer;
