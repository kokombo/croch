import SelectField from "@/components/select-field";
import { icons } from "@/constants";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";

type Props = {
  status: SingleValue<SelectOption>;
  setStatus: Dispatch<SetStateAction<SingleValue<SelectOption>>>;
};

const OrderFilter = (props: Props) => {
  return (
    <div className="flex_item_justify_between py-6  border-x-[1px] border-t-[1px] border-grey px-12">
      <div></div>

      <div className="flex_center gap-4">
        <SelectField
          label="Status"
          options={[
            { label: "All Orders", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Filfilled", value: "filfilled" },
            { label: "Cancelled", value: "cancelled" },
          ]}
          name="status"
          id="status"
          status={props.status}
          setStatus={props.setStatus}
        />

        {/* <SelectField /> */}

        <button className="py-3 px-5 border-[1px] b rounded-[4px] bg-black">
          <span className="flex_item_justify_center gap-1">
            <Image
              src={icons.whitefilter}
              alt="filter button icon"
              className="h-4 w-4 lg:h-6 lg:w-6"
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
