// import "./customDatePicker.style.scss";
// import DatePicker from "react-datepicker2";
// import React, { useEffect, useState } from "react";
// import moment from "jalali-moment";
// import { CustomDatePickerPropsTypes } from "./customDatePicker.types";
//
// const CustomDatePicker: React.FC<CustomDatePickerPropsTypes> = (props) => {
//   const { onChange, value, className = "" } = props;
//   const [dateValue, setDateValue] = useState("");
//   const [datePickerValue, setDatePickerValue] = useState<any>(moment());
//
//   const handleValueFormat = () => {
//     if (value) {
//
//       const toJalali = moment
//         .from(`${value}T00:00:00`, "en")
//         .locale("fa")
//         .format("jYYYY/jMM/jDD");
//
//       // setDatePickerValue();
//     }
//   };
//
//   useEffect(() => {}, [datePickerValue]);
//
//
//   useEffect(() => {
//     if (value) handleValueFormat();
//   }, [value]);
//
//   return (
//     <DatePicker
//       value={datePickerValue}
//       onChange={(value) => setDateValue(value)}
//       className={`custom-date-picker ${className}`}
//       timePicker={false}
//       isGregorian={false}
//       removable
//     />
//   );
// };
//
// export default CustomDatePicker;

export {};
