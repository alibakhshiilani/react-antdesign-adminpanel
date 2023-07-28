import React from "react";
import moment from "jalali-moment";
import { DatePicker as DatePickerJalali } from "antd-jalali";
import { FilterFromToInterface } from "./filterFromTo.types";
import "./filterFromTo.scss";
import { convertMomentDateToIso } from "../../../../app/date.util";

const FilterFromTo: React.FC<FilterFromToInterface> = (props) => {
  const { showDatePickers, setShowDatePickers, setFilter, filter } = props;

  const handleConfirm = (
    dates: [moment.Moment, moment.Moment],
    dateStrings: [string, string]
  ) => {
    if (setFilter) {
      // const newIsoDate0 = new Date(
      //   moment
      //     .from(dateStrings[0], "fa", "YYYY-MM-DD HH:mm:ss")
      //     .format("YYYY-MM-DDTHH:mm:ss.ssZ")
      // ).toISOString();
      // const newIsoDate1 = new Date(
      //   moment
      //     .from(dateStrings[1], "fa", "YYYY-MM-DD HH:mm:ss")
      //     .format("YYYY-MM-DDTHH:mm:ss.ssZ")
      // ).toISOString();

      setFilter({
        ...filter,
        filterDate: {
          from: convertMomentDateToIso(dates[0]),
          to: convertMomentDateToIso(dates[1]),
          // from: newIsoDate0,
          // to: newIsoDate1,
        },
      });
    }
    if (setShowDatePickers) {
      setShowDatePickers(!showDatePickers);
    }
  };

  // server: 2021-09-25T07:45:16.688
  // me:     2021-11-21T10:14:53.000Z

  // function handleReset() {
  //   setSelectedKeys([]);
  //   clearFilters();
  // }

  return (
    <div className="filter-fromTo">
      <DatePickerJalali.RangePicker
        className="mt-2"
        showTime
        onChange={handleConfirm}
      />
    </div>
  );
};

export default FilterFromTo;
