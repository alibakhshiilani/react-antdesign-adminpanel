import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "jalali-moment";
import JalaliDay from "jalaliday";
import { DatePicker as DatePickerJalali } from "antd-jalali";
import "./dateFromTo.scss";
import { DateFromToInterface } from "./dateFromTo.types";
import "dayjs/locale/fa";
import {
  convertIsoToMiladiStringWithFormat,
  convertMomentDateToIso,
} from "../../app/date.util";

dayjs.extend(JalaliDay);

const DateFromTo: React.FC<DateFromToInterface> = (props) => {
  const { showDatePickers, setShowDatePickers, onChange, value } = props;

  const [valueToMoment, setValueToMoment] = useState<any>([]);

  useEffect(() => {
    if (value && value.from && value.to) {
      // convert ISO date to miladi format
      const fromDayjs = convertIsoToMiladiStringWithFormat(value.from);
      const toDayjs = convertIsoToMiladiStringWithFormat(value.to);

      setValueToMoment([
        dayjs(fromDayjs, "HH:mm:ss YYYY-MM-DD", "en", true).calendar("jalali"),
        dayjs(toDayjs, "HH:mm:ss YYYY-MM-DD", "en", true).calendar("jalali"),
      ]);
    }
  }, [props]);

  const handleConfirm = (
    dates: [moment.Moment, moment.Moment],
    dateStrings: [string, string]
  ) => {
    if (onChange) {
      onChange({
        from: convertMomentDateToIso(dates[0]),
        to: convertMomentDateToIso(dates[1]),
      });

      setValueToMoment(dates);
    }
    // }
    if (setShowDatePickers) {
      setShowDatePickers(!showDatePickers);
    }
  };

  return (
    <div className="filter-fromTo">
      <DatePickerJalali.RangePicker
        className="mt-2"
        showTime
        onChange={handleConfirm}
        value={valueToMoment}
      />
    </div>
  );
};

export default DateFromTo;
