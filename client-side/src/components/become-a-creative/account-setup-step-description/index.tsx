import AccountSetupStepInfo from "../account-setup-step-info";
import { CREATIVE_ACCOUNT_SETUP } from "@/constants/data";

type Props = {
  step: number;
};

const AccountSetupStepDescription = (props: Props) => {
  return (
    <div>
      {props.step === 1 && (
        <AccountSetupStepInfo
          label={CREATIVE_ACCOUNT_SETUP.step1.label}
          title={CREATIVE_ACCOUNT_SETUP.step1.title}
          description={CREATIVE_ACCOUNT_SETUP.step1.description}
        />
      )}

      {props.step === 2 && (
        <AccountSetupStepInfo
          label={CREATIVE_ACCOUNT_SETUP.step2.label}
          title={CREATIVE_ACCOUNT_SETUP.step2.title}
          description={CREATIVE_ACCOUNT_SETUP.step2.description}
        />
      )}

      {props.step === 3 && (
        <AccountSetupStepInfo
          label={CREATIVE_ACCOUNT_SETUP.step3.label}
          title={CREATIVE_ACCOUNT_SETUP.step3.title}
          description={CREATIVE_ACCOUNT_SETUP.step3.description}
        />
      )}
    </div>
  );
};

export default AccountSetupStepDescription;
