import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import moment from "moment-jalaali";
import "./CustomTimeInput.style.scss";

const CustomTimeInput = (props: any) => {
  const {
    form,
    disableHourSelect,
    value,
    data,
    id,
    onChange,
    rangeHours,
    rangeToMinute,
    rangeFromMinute,
    rangeSeconds,
    rangeDefaultMinute,
    rangeDefaultHour,
    showSecond,
    stepMinute,
    selectDate,
    name,
    lable,
    rules,
  } = props;

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const checkVal = (value: number) => {
    let result: string | number = value;
    if (value < 10) {
      result = `0${value}`;
    }
    return result;
  };

  useEffect(() => {
    if (typeof selectDate === "string" && selectDate.length > 0) {
      // @ts-ignore
      const customDate = selectDate.split("T");
      const customDate2 = customDate[1].split(".");
      if (hour || minute || second) {
        const date = moment(new Date()).format("YYYY-MM-DD");

        const result = `${customDate[0]}T${checkVal(hour)}:${checkVal(
          minute
        )}:${checkVal(second)}.${customDate2[1]}`;

        if (onChange) {
          onChange(result);
        }
      }
    }
  }, [hour, minute, second, onChange, value]);

  return (
    <Input.Group
      // @ts-ignore
      id={id}
      compact
    >
      <div className="textBox">ساعت</div>
      <Select
        disabled={disableHourSelect}
        placeholder="ساعت"
        // defaultValue={rangeHours[0] || 0}
        value={hour}
        onChange={(value) => setHour(value)}
        style={{ width: "250", marginLeft: "1rem" }}
      >
        {rangeHours && rangeHours.length > 0
          ? rangeHours.map((hourItem: any) => {
              const hourTime = hourItem;
              return (
                <Select.Option key={`time-hour-${hourItem}`} value={hourTime}>
                  {hourTime}
                </Select.Option>
              );
            })
          : rangeDefaultHour.map((hourItem: any) => {
              const hourTime = hourItem;
              return (
                <Select.Option key={`time-hour-${hourItem}`} value={hourTime}>
                  {hourTime}
                </Select.Option>
              );
            })}
      </Select>

      <div className="textBox">دقیقه</div>
      <Select
        disabled={!hour}
        placeholder="دقیقه"
        // defaultValue={rangeHours[0] || 0}
        value={minute}
        onChange={(value) => setMinute(value)}
        style={{ width: "110", marginLeft: "1rem" }}
      >
        {rangeHours.length === 1 && rangeHours[0] === hour
          ? rangeFromMinute.map((minuteItem: any) => {
              const minuteTime = minuteItem;
              return (
                minuteTime % stepMinute === 0 && (
                  <Select.Option
                    key={`time-minute-${minuteItem}`}
                    value={minuteTime}
                  >
                    {minuteTime}
                  </Select.Option>
                )
              );
            })
          : rangeHours.length === 1 && rangeHours[1] === hour
          ? rangeToMinute.map((minuteItem: any) => {
              const minuteTime = minuteItem;
              return (
                minuteTime % stepMinute === 0 && (
                  <Select.Option
                    key={`time-minute-${minuteItem}`}
                    value={minuteTime}
                  >
                    {minuteTime}
                  </Select.Option>
                )
              );
            })
          : rangeHours.length !== 1 &&
            rangeHours[rangeHours.length - 1] === hour
          ? rangeToMinute.map((minuteItem: any) => {
              const minuteTime = minuteItem;
              return (
                minuteTime % stepMinute === 0 && (
                  <Select.Option
                    key={`time-minute-${minuteItem}`}
                    value={minuteTime}
                  >
                    {minuteTime}
                  </Select.Option>
                )
              );
            })
          : rangeHours.length !== 1 && rangeHours[0] === hour
          ? rangeFromMinute.map((minuteItem: any) => {
              const minuteTime = minuteItem;
              return (
                minuteTime % stepMinute === 0 && (
                  <Select.Option
                    key={`time-minute-${minuteItem}`}
                    value={minuteTime}
                  >
                    {minuteTime}
                  </Select.Option>
                )
              );
            })
          : rangeDefaultMinute.map((minuteItem: any) => {
              const minuteTime = minuteItem;
              return (
                minuteTime % stepMinute === 0 && (
                  <Select.Option
                    key={`time-minute-${minuteItem}`}
                    value={minuteTime}
                  >
                    {minuteTime}
                  </Select.Option>
                )
              );
            })}
        {/* {rangeHours.length !== 1 && rangeHours[rangeHours.length - 1] === hour */}
        {/*  ? rangeToMinute.map((minuteItem: any) => { */}
        {/*      const minuteTime = minuteItem; */}
        {/*      return ( */}
        {/*        minuteTime % stepMinute === 0 && ( */}
        {/*          <Select.Option */}
        {/*            key={`time-minute-${minuteItem}`} */}
        {/*            value={minuteTime} */}
        {/*          > */}
        {/*            {minuteTime} */}
        {/*          </Select.Option> */}
        {/*        ) */}
        {/*      ); */}
        {/*    }) */}
        {/*  : rangeHours[0] === hour */}
        {/*  ? rangeFromMinute.map((minuteItem: any) => { */}
        {/*      const minuteTime = minuteItem; */}
        {/*      return ( */}
        {/*        minuteTime % stepMinute === 0 && ( */}
        {/*          <Select.Option */}
        {/*            key={`time-minute-${minuteItem}`} */}
        {/*            value={minuteTime} */}
        {/*          > */}
        {/*            {minuteTime} */}
        {/*          </Select.Option> */}
        {/*        ) */}
        {/*      ); */}
        {/*    }) */}
        {/*  : rangeDefaultMinute.map((minuteItem: any) => { */}
        {/*      const minuteTime = minuteItem; */}
        {/*      return ( */}
        {/*        minuteTime % stepMinute === 0 && ( */}
        {/*          <Select.Option */}
        {/*            key={`time-minute-${minuteItem}`} */}
        {/*            value={minuteTime} */}
        {/*          > */}
        {/*            {minuteTime} */}
        {/*          </Select.Option> */}
        {/*        ) */}
        {/*      ); */}
        {/*    })} */}
      </Select>

      {showSecond && (
        <>
          <div className="textBox">ثانیه</div>
          <Select
            disabled={!data}
            placeholder="ثانیه"
            // defaultValue={rangeHours[0] || 0}
            value={second}
            onChange={(value) => setSecond(value)}
            style={{ width: "250" }}
          >
            {rangeSeconds.map((secondItem: any) => {
              const secondTime = secondItem;
              return (
                <Select.Option
                  key={`time-hour-${secondItem}`}
                  value={secondTime}
                >
                  {secondTime}
                </Select.Option>
              );
            })}
          </Select>
        </>
      )}
    </Input.Group>
  );
};

export default CustomTimeInput;
