import React from "react";
import { AutoComplete } from "antd";
import { AutoCompleteInputSearchInterface } from "./autoCompleteInputSearch.types";

const AutoCompleteInputSearch: React.FC<AutoCompleteInputSearchInterface> = (
  props
) => {
  const { selectedKeys, setSelectedKeys } = props;

  const handleSearch = (selectedKeys: any[], confirm: () => void) => () => {
    confirm();
    if (setSelectedKeys) {
      setSelectedKeys(selectedKeys[0]);
    }
  };

  return (
    <div>
      <AutoComplete
        // dataSource={""}
        placeholder="Search name"
        // value={selectedKeys}
        onChange={() =>
          setSelectedKeys ? setSelectedKeys(selectedKeys || [0]) : ""
        }
      />
    </div>
  );
};

export default AutoCompleteInputSearch;
