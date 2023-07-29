import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import moment from "moment-jalaali";

// let fullYear = new Date().getFullYear();
const fullYear: any = moment().format("jYYYY");

const CustomDateInput = (props: {
  id?: any;
  value?: any;
  onChange?: (data: any) => void;
  showYear?: boolean;
  showMonth?: boolean;
}) => {
  const { id, value, onChange, showYear, showMonth } = props;

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  // @ts-ignore
  const yearList = [...Array(90).keys()];
  // @ts-ignore
  const daysList = [...Array(31).keys()];

  const convertValueToPersianDate = () => {
    if (value && day === 0) {
      // if (value) {
      if (value.search("-") > -1) {
        const time = moment(value, "YYYY-MM-DD").format("jYYYY-jMM-jDD");

        if (time && time.length) {
          const result = time.split("-").map((element: any) => Number(element));
          setYear(result[0]);
          setMonth(result[1]);
          setDay(result[2]);
        }
      }
    }
  };

  useEffect(() => {
    convertValueToPersianDate();
  }, [value]);

  useEffect(() => {
    if (day || year || month) {
      const result = `${checkVal(year)}-${checkVal(month)}-${checkVal(day)}`;

      if (onChange && showYear && !showMonth) {
        const temp = `${year}-01-01`;
        onChange(moment(temp, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      } else if (onChange && showYear && showMonth) {
        const temp = `${year}-${month}-01`;
        onChange(moment(temp, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      } else if (onChange) {
        onChange(
          moment(result, "jYYYY-jMM-jDD").locale("en").format("YYYY-MM-DD")
        );
      }
    }
  }, [year, month, day, onChange, value]);

  const checkVal = (value: number) => {
    let result: string | number = value;
    if (value < 10) {
      result = `0${value}`;
    }
    return result;
  };

  return (
    // @ts-ignore
    <Input.Group id={id} compact>
      <Select
        defaultValue={(showYear && 1) || 0}
        value={day}
        onChange={(value) => setDay(value)}
        style={{ width: 70, display: (showYear && "none") || "" }}
      >
        <Select.Option value={0}>روز</Select.Option>
        {daysList.map((index) => {
          const day = index + 1;
          return (
            <Select.Option key={`day-${index}`} value={day}>
              {day}
            </Select.Option>
          );
        })}
      </Select>
      <Select
        defaultValue={(!showMonth && 1) || 0}
        value={month}
        onChange={(value) => setMonth(value)}
        style={{ width: 110, display: (!showMonth && "none") || "" }}
      >
        <Select.Option value={0}>ماه</Select.Option>
        <Select.Option key={`month-${1}`} value={1}>
          {" "}
          فروردین{" "}
        </Select.Option>
        <Select.Option key={`month-${2}`} value={2}>
          {" "}
          اردیبهشت{" "}
        </Select.Option>
        <Select.Option key={`month-${3}`} value={3}>
          {" "}
          خرداد{" "}
        </Select.Option>
        <Select.Option key={`month-${4}`} value={4}>
          {" "}
          تیر{" "}
        </Select.Option>
        <Select.Option key={`month-${5}`} value={5}>
          {" "}
          مرداد{" "}
        </Select.Option>
        <Select.Option key={`month-${6}`} value={6}>
          {" "}
          شهریور{" "}
        </Select.Option>
        <Select.Option key={`month-${7}`} value={7}>
          {" "}
          مهر{" "}
        </Select.Option>
        <Select.Option key={`month-${8}`} value={8}>
          {" "}
          آبان{" "}
        </Select.Option>
        <Select.Option key={`month-${9}`} value={9}>
          {" "}
          آذر{" "}
        </Select.Option>
        <Select.Option key={`month-${10}`} value={10}>
          {" "}
          دی{" "}
        </Select.Option>
        <Select.Option key={`month-${11}`} value={11}>
          {" "}
          بهمن{" "}
        </Select.Option>
        <Select.Option key={`month-${12}`} value={12}>
          {" "}
          اسفند{" "}
        </Select.Option>
      </Select>
      <Select
        defaultValue={0}
        value={year}
        onChange={(value) => setYear(value)}
        style={{ width: 90 }}
      >
        <Select.Option value={0}>سال</Select.Option>
        {yearList.map((index) => {
          const year = fullYear - index;
          return (
            <Select.Option key={`year-${index}`} value={year}>
              {year}
            </Select.Option>
          );
        })}
      </Select>
    </Input.Group>
  );
};

export default CustomDateInput;
