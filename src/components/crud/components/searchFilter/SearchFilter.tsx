import { Input } from "antd";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { SearchFilterInterface } from "./searchFilter.types";
import { checkValue } from "../../../../app/util";

const SearchFilter: React.FC<SearchFilterInterface> = (props) => {
  const { setFilter, item, title, style, reset, setReset, filter, extraTitle } =
    props;
  const [value, setValue] = useState("");
  const history = useHistory();

  useEffect(
    () => {
      const parsedQueryString: any = queryString.parse(history.location.search);
      if (
        parsedQueryString[item] &&
        checkValue(parsedQueryString[item]) &&
        !checkValue(value)
      ) {
        setValue(parsedQueryString[item]);
      }
    },
    // eslint-disable-next-line
    [history]
  );

  useEffect(
    () => {
      if (setFilter) {
        setFilter((prevData: object) => ({
          ...prevData,
          [item]: value,
        }));
      }
    },
    // eslint-disable-next-line
    [value]
  );

  useEffect(() => {
    if (reset) {
      setValue("");
      setReset(false);
    }
  }, [reset]);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div style={style} className="search-filter">
      <Input
        onChange={handlerChange}
        placeholder={`${extraTitle || title}`}
        // @ts-ignore
        value={value}
        className="search-filter"
      />
    </div>
  );
};

export default SearchFilter;
