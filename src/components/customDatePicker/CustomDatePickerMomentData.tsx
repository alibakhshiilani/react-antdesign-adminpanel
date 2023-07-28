import DatePicker from "react-datepicker2";
import moment from "jalali-moment";
import React from "react";
import { CustomDatePickerMomentDataType } from "./CustomDatePickerMomentData.type";

const CustomDatePickerMomentData: React.FC<CustomDatePickerMomentDataType> = (
  props
) => {
  const { value, onChange, hasTimePicker = true } = props;
  return (
    <DatePicker
      timePicker={hasTimePicker}
      value={
        typeof value === "string" && value.search("T") > -1
          ? moment(new Date(value))
          : value
      }
      onChange={(value) => (onChange ? onChange(value) : "")}
      className="discount-datepicker-input"
      removable
    />
  );
};

export default CustomDatePickerMomentData;
