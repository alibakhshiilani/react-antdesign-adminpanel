import React from "react";
import { InputNumber, message } from "antd";
import { just_digit, rialValue, tomanValue } from "../../../../../app/util";
import "./customInputRialToman.style.scss";

const CustomInputRialToman: React.FC<any> = (props) => {
  const { onChange, value, ...otherProps } = props;

  return (
    <InputNumber
      value={value}
      formatter={(value: any) => {
        return `${tomanValue(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }}
      parser={(value: any) => {
        return rialValue(value.replace(/\$\s?|(,*)/g, ""));
      }}
      onKeyPress={(e: any) => {
        const pressedKey = String.fromCharCode(
          !e.charCode ? e.which : e.charCode
        );
        if (!just_digit(pressedKey)) {
          message.error("فقط اعداد انگلیسی مجاز هستند");
          e.preventDefault();
          return false;
        }
      }}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default CustomInputRialToman;
