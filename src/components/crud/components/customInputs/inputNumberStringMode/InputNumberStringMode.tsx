import React from "react";
import { InputNumber } from "antd";

export interface inputNumberStringModePropsTypes {
  min?: number | string;
  max?: number | string;
  step?: number | string;
  defaultValue?: number | string;
  style?: object;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
const InputNumberStringMode: React.FC<any> = (props) => {
  const { value, onChange, min, max, step, style } = props;

  return (
    <InputNumber
      // type="text"
      value={value}
      // value={defaultValue}
      style={style}
      min={min}
      max={max}
      step={step}
      stringMode
      onChange={onChange}
    />
  );
};

export default InputNumberStringMode;
