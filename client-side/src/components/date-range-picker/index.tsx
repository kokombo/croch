import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePicker } from "react-date-range";
import type { RangeKeyDict } from "react-date-range";

type Props = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  handleSelect: (rangesByKey: RangeKeyDict) => void;
};

const MyDateRangePicker = (props: Props) => {
  const selectionRange = {
    startDate: props.startDate,
    endDate: props.endDate,
    key: "selection",
  };

  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={props.handleSelect}
      className="absolute z-[1000]"
      editableDateInputs

      // inputRanges={}
    />
  );
};

export default MyDateRangePicker;
