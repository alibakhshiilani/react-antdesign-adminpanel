import moment from "jalali-moment";
import axios from "axios";
import FileDownload from "js-file-download";
import { message } from "antd";

export const logType = {
  info: "information",
  warn: "warning",
  error: "error",
};

export const Log = (entry?: object | string, type = logType.info) => {
  const environment = process.env.NODE_ENV || "development";
  if (environment !== "development") {
    return false;
  }

  if (type === logType.info) {
    console.log(entry);
  } else if (type === logType.warn) {
    console.warn(entry);
  } else if (type === logType.error) {
    console.error(entry);
  }
};

export const convertArrayToTitleObject = (data: any[]) => {
  if (!data || (data && JSON.stringify(data) === "{}")) {
    Log("not found data!", logType.error);
    return {};
  }

  const temp: { title: any; key: number }[] = [];
  data.forEach((item, index) => {
    temp.push({
      title: item,
      key: index + 1,
    });
  });

  return temp;
};

export const getNormalizeObj = (array: any[], index = "id") => {
  const normalize: any = {};
  if (array && array.length > 0) {
    array.forEach((i) => {
      normalize[i[index]] = i;
    });
  }
  return normalize;
};

export const checkValue = (value: string | null) => {
  return typeof value !== "undefined" && value !== null && value !== "";
};

export const setValue = (data: any) => {
  if (data) {
    return data;
  }
  return "-";
};

export const numberToLocalString = (text: { toLocaleString: () => any }) => {
  if (text) {
    return text.toLocaleString();
  }
};

export const parseParentChildren = (data: any[], extraFields: any) => {
  const searchAndGetChildren = (
    data: any[],
    result: any[],
    item: { id: any },
    fields: { [x: string]: any }
  ) => {
    let res: never[] | null = null;

    data.forEach((i) => {
      if (i.parentId === item.id) {
        const d: never | any = {};
        // eslint-disable-next-line guard-for-in
        for (const prop in fields) {
          const val = fields[prop];
          d[prop] = i[val];
        }
        d.children = searchAndGetChildren(data, result, i, fields);
        // @ts-ignore
        (res || (res = [])).push(d);
      }
    });

    return res;
  };

  const fields = {
    id: "id",
    parentId: "parentId",
    ...extraFields,
  };
  const result: any[] = [];

  // set parent with parentId===null
  data.forEach((c) => {
    if (!c.parentId) {
      const d: any = {};
      // eslint-disable-next-line guard-for-in
      for (const prop in fields) {
        const val = fields[prop];
        d[prop] = c[val];
      }

      result.push(d);
    }
  });

  result.forEach((i, index) => {
    // eslint-disable-next-line no-constant-condition
    result[index]["children" ? "children" : "childFolders"] =
      searchAndGetChildren(data, result, i, fields);
  });

  return result;
};

export const getFieldValue = (data: { fields: any }) => {
  if (!data || !data.fields) {
    return "";
  }
  let result: any = "";
  if (data && data.fields) {
    result = [...data.fields];
  }
  return result;
};

export const downloadURL = (url?: string, name?: string) => {
  const element = document.createElement("a");
  if (typeof url === "string") {
    element.setAttribute("href", url);
  }
  element.innerText = "hello";
  if (typeof name === "string") {
    element.setAttribute("download", name);
  }
  // element.setAttribute("target", "_blank");
  element.style.display = "none";
  element.dispatchEvent(
    new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window })
  );
  document.body.appendChild(element);
  setTimeout(() => {
    document.body.removeChild(element);
  }, 100);
};

export const downloadWithAxios = (
  url: any,
  name: string,
  setLoading?: (arg0: boolean) => void
) => {
  const handleSetLoading = (status = false) => {
    if (setLoading) {
      setLoading(status);
    }
  };
  handleSetLoading(true);
  axios({
    url,
    method: "GET",
    responseType: "blob", // Important
  })
    .then((r) => {
      FileDownload(r.data, name);
      handleSetLoading();
    })
    .catch((e) => {
      message.error("خطا در دانلود فایل");
      console.log(e);
      handleSetLoading();
    });
};

export const getCookieLanguages = () => {
  const value = `; ${document.cookie}`;
  const parts: any = value.split("; i18next=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const getDateString = (
  date: moment.MomentInput | undefined,
  formatString: string = "jYYYY/jMM/jDD"
) => {
  if (!date) {
    return "-";
  }

  try {
    return moment(date).format(formatString);
  } catch (e) {
    return "incorrect date";
  }
};

export const getIsoDateString = (
  date: moment.MomentInput | undefined,
  formatString: string = "jYYYY/jMM/jDD"
) => {
  if (!date) {
    return "-";
  }

  try {
    return moment(moment(date).format("HH:mm:ss YYYY-MM-DD")).format(
      formatString
    );
  } catch (e) {
    return "incorrect date";
  }
};

export const getFilterDateString = (date: moment.MomentInput | undefined) => {
  if (!date) {
    return "";
  }

  try {
    return moment(date).format("YYYY-MM-DD");
  } catch (e) {
    return date;
  }
};

export const MilliSecondToTime = (millisecond: number) => {
  if (millisecond > 0)
    return new Date(millisecond * 1000).toISOString().substr(11, 8);
  if (millisecond === 0) {
    return "-";
  }
};

export const ConvertCentToDollar = (cent: number | null) => {
  if (cent === 0 || cent === null) {
    return "-";
  }
  try {
    if (cent > 0) {
      return `$${cent / 100}`;
    }
  } catch (e) {
    return cent;
  }
};

export const hasOwnNestedProperty = (
  obj: { [x: string]: any } | null,
  key: string
) => {
  return key.split(".").every((x) => {
    // @ts-ignore
    // eslint-disable-next-line no-negated-in-lhs
    if (typeof obj !== "object" || obj === null || !(x in obj)) return false;
    obj = obj[x];
    return true;
  });
};

export const errorMessageHandler = (error: any | null) => {
  if (
    hasOwnNestedProperty(error, "response.data.errors") &&
    error.response.data.errors !== undefined &&
    error.response.data.errors !== null &&
    error.response.data.errors.length > 0
  ) {
    return error.response.data.errors.forEach(
      (errorText: { messages: [string]; field: string }) => {
        message.error(`${errorText.field}:${errorText.messages.toString()}`);
      }
    );
  }
  if (
    hasOwnNestedProperty(error, "response.data.message") &&
    error.response.data.message !== undefined &&
    error.response.data.message !== "" &&
    error.response.data.message !== null
  ) {
    return error.response.data.message;
  }
  return "خطا در ارسال اطلاعات";
};

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const camelCaseToText = (string: string) => {
  return string.replace(/([a-z](?=[A-Z]))/g, "$1 ");
};

export const justLetter = (value: string) => {
  let result = true;
  if (typeof value === "undefined") {
    result = false;
  } else if (!/^[a-zA-Z]+$/.test(value)) {
    result = false;
  }
  return result;
};

export const just_digit = (str: string) => {
  const p = /^\d+$/;
  if (p.test(str)) {
    return true;
  }
  message.error("فقط اعداد انگلیسی مجاز هستند");
  return false;
};

export const just_float_digit = (str: string) => {
  const p = /^[0-9]*([.,])?[0-9]*$/;
  return p.test(str);
};

export const justEnglishLetterAndNumbers = (value: string) => {
  let result = true;
  if (typeof value === "undefined") {
    message.error("فقط اعداد و حروف انگلیسی مجاز هستند");
    result = false;
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    result = false;
  }
  return result;
};

export function just_persian_character(str: string) {
  const p = /(.*[\u0600-\u06FF\s])/i;
  return p.test(str);
}

export const just_character_symbols = (str: string) => {
  const p = /^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/;
  if (p.test(str)) {
    return true;
  }
  message.error("فقط اعداد و حروف انگلیسی مجاز هستند");
  return false;
};

export const checkData = (text: any) => {
  if (!text) {
    return "-";
  }
  return text;
};

export const discount_code = (str: string) => {
  const p = /^[a-zA-Z0-9-_]+$/;
  return p.test(str);
};

export const RegexPatterns = {
  onlyNumbers: "^[0-9]*$",
  percentNumbers: "^100(\\.0{0,2})? *%?$|^\\d{1,2}(\\.\\d{1,2})? *%?$",
  email:
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])",
  mobile: "^[0-9]*$",
  onlyEnglishNumberAndCharacter: "!/^[a-zA-Z0-9]+$/",
  discountCode: "/^[a-zA-Z0-9-_]+$/",
  // eslint-disable-next-line
  DecimalNumbersBetweenZeroOne: /^(0(\.\d+)?|1(\.0)?)$/,
};

export const forceUpdate = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.update();
      }
    });
  } else {
    window.location.reload();
  }

  window.location.href = window.location.origin + window.location.pathname;
};

export const isDark = window.localStorage.getItem("theme") === "dark";

export const convertDateToUTC = (date: moment.Moment | string | number) => {
  try {
    return moment(date).toISOString();
  } catch (error) {
    return "invalid Date";
  }
};

export const validateContentTitle = (rule: any, value: any, callback: any) => {
  if (value) {
    const result: any = /^[^-_]+$/.test(value);
    if (value && result) {
      callback();
    } else {
      callback('شما مجاز به استفاده از کاراکتر "-" و "_" در عنوان نیستید');
    }
  } else {
    callback();
  }
};

export const validateAmount = (rule: any, value: any, callback: any) => {
  if (value) {
    const result: any = /^([1-9][0-9][0-9][0-9])\d*$/.test(value);
    if (value && result) {
      callback();
    } else {
      callback(`مبلغ وارد شده نباید کمتر از ۲۰۰۰ تومان باشد.`);
    }
  } else {
    callback();
  }
};

export function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const getNameString = (object: any, showMobile = true) => {
  if (object && object.extraInfo) {
    if (object.extraInfo.fullName && object.extraInfo.fullName !== "") {
      return object.extraInfo.fullName;
    }
    if (
      object.extraInfo.firstName &&
      object.extraInfo.firstName !== "" &&
      object.extraInfo.lastName &&
      object.extraInfo.lastName !== ""
    ) {
      return `${object.extraInfo.firstName} ${object.extraInfo.lastName}`;
    }
    if (object.extraInfo.firstName && object.extraInfo.firstName !== "") {
      return object.extraInfo.firstName;
    }
    if (object.extraInfo.lastName && object.extraInfo.lastName !== "") {
      return object.extraInfo.lastName;
    }
  }

  if (showMobile && object.username) {
    return object.username;
  }

  if (showMobile && object.mobile) {
    return object.mobile;
  }

  return "نا مشخص";
};

export const rialValue = (amount: number) => {
  if (!amount) return 0;
  return Math.round(amount * 10);
};
export const tomanValue = (amount: number) => {
  if (!amount) return 0;
  return Math.round(amount / 10);
};

export const mergeTwoArraysWithoutDuplicate = (a: any[], b: any[]) => {
  if (!b.push || !b.length) return a;
  if (!a.length) return b.concat();
  for (let i = 0; i < b.length; i++) {
    if (a.map((el) => el.id).indexOf(b[i]) === -1) a.push(b[i]);
  }

  return a;
};
