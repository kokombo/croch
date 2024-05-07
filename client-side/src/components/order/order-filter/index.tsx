import MyDateRangePicker from "@/components/date-range-picker";
import SelectField from "@/components/input-fields/select-field";
import { icons } from "@/constants";
import { ORDER_STATUS } from "@/constants/data";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { SingleValue } from "react-select";

type Props = {
  status: SingleValue<SelectOption>;
  setStatus: Dispatch<SetStateAction<SingleValue<SelectOption>>>;
  startDate: Date | undefined;
  endDate: Date | undefined;
  handleSelect: (rangesByKey: RangeKeyDict) => void;
};

const OrderFilter = (props: Props) => {
  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className="flex_item_justify_between py-6  border-x-[1px] border-t-[1px] border-grey px-4">
      <div>
        <span onClick={() => setShowCalender((showCalender) => !showCalender)}>
          <Image
            src={icons.date}
            alt=""
            height={20}
            width={20}
            priority
            quality={100}
            className="cursor-pointer"
          />
        </span>

        <Fragment>
          {showCalender && (
            <MyDateRangePicker
              startDate={props.startDate}
              endDate={props.endDate}
              handleSelect={props.handleSelect}
            />
          )}
        </Fragment>
      </div>

      <div className="flex_center gap-4">
        <SelectField
          label="Status"
          options={ORDER_STATUS}
          name="status"
          id="status"
          status={props.status}
          setStatus={props.setStatus}
        />

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
