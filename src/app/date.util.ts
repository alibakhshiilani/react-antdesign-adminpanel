import moment from "jalali-moment";

//= ==========================================================================

// MOMENT Date like date =======>

// {$C: "jalali"   ----> important <----
// $D: 22
// $H: 7
// $L: "en"
// $M: 10
// $W: 1
// $d: Mon Nov 22 2021 07:59:58 GMT+0330 (Iran Standard Time) {}
// $jD: 1
// $jM: 8
// $jy: 1400
// $m: 59
// $ms: 0
// $s: 58
// $u: undefined
// $x: {}
// $y: 2021}

// to ISO Date like     =======>    " 2021-11-22T04:29:58.000Z"

export const convertMomentDateToIso = (momentDate: any) => {
  if (!momentDate) {
    return "-";
  }
  return new Date(momentDate).toISOString();
};

//= ==========================================================================

// ISO Date like date     =======>    "2021-11-28T07:59:58.438"

// ISO Miladi Date with format "HH:mm:ss YYYY-MM-DD" like      =======>    "07:59:58 2021-11-28"

export const convertIsoToMiladiStringWithFormat = (
  isoDate: any,
  miladiFormat: string = "HH:mm:ss YYYY-MM-DD"
) => {
  if (!isoDate) {
    return "-";
  }
  return moment(isoDate).format(miladiFormat);
};

//= ==========================================================================

//
// export const getDateString = (
//     date: string | undefined | Date,
//     formatString: string = "jYYYY/jMM/jDD hh:mm"
// ) => {
//   if (!date) {
//     return "-";
//   }
//
//   try {
//     return moment(date as string)
//         .locale("fa")
//         .format(formatString);
//   } catch (e) {
//     return "incorrect date";
//   }
// };
//= ==========================================================================
export const convertUnixToIso = (unixDate: any) => {
  const date = moment.unix(unixDate / 1000);
  return date.toISOString();
};
//= ==========================================================================
export function isIsoDate(stringDate: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(stringDate))
    return false;
  const d = new Date(stringDate);
  return d.toISOString() === stringDate;
}
//= ==========================================================================
export function getCookieLanguages() {
  const value: any = `; ${document.cookie}`;
  const parts: any = value.split("; i18next=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}
//= ==========================================================================
export function getDateString(
  date: any,
  format = {
    en: "YYYY/MM/DD - HH:mm",
    fa: "jYYYY/jMM/jDD - HH:mm",
  }
) {
  if (!date) {
    return "";
  }

  try {
    let time = "";
    const isEn = getCookieLanguages() === "en";
    if (isEn) {
      time = moment(date).format(format.en);
    }
    time = moment(date).format(format.fa);

    return time;
  } catch (e) {
    return date;
  }
}
//= ==========================================================================

export const formatGregorianDate = (gregorianDate: any) => {
  const date = new Date(gregorianDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullYear = `${year}/${month}/${day}`;
  return fullYear;
};

//= ==========================================================================
