// De yyyy-MM-dd a dd/MM/yyy
// https://date-fns.org
import { format, parse } from "date-fns";
export const formatDateToShow = (date, withHour = false) => {
  if (!date) {
    return null;
  }
  let parseString = "yyyy-MM-dd";
  if (withHour) {
    parseString += " HH:mm:SS";
  }
  return format(parse(date, parseString, new Date()), "dd/MM/yyyy");
};

// Toast
// https://szboynono.github.io/mosha-vue-toastify/
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
export function showToast(text, type) {
  createToast(text, {
    type: type, //success, error, 
    transition: "bounce",
    position: "top-right",
    // hideProgressBar: true,
    showIcon: true,
  });
}


// Object to CSV
export function convertToCSV(objArray, columns) {
  let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

  let str = "data:text/csv;charset=utf-8,";

  str += columns.map(c => c.title).join(',');
  str += "\r\n";

  for (let i = 0; i < array.length; i++) {
    let row = array[i];

    let line = "";
    for (let field of columns.map(c=>c.id)) {
      if (line != "") line += ",";
      let value = row[field];
      value = Array.isArray(value)
        ? value.map((v) => v.value).join(",")
        : value; // If array -> String comma separated
      value = `"${value}"`; // Handler string with comma

      line += value;
    }
    str += line + "\r\n";
  }

  return str;
}

export function getAsset(url) {
  return new URL(url, import.meta.url).href;
};

// 0000.00 to 0.000,00
export function numberToString(num) {
  num = num + "";
  num = num.replace(".", ",");
  num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return num;
}

export const removeHtmlFromString = (string) => {
  let regex = /(<([^>]+)>)/gi;
  return string.replace("&nbsp;", "").replace(regex, "");
};

export const roundDecimals = (num, decimals = 2) => {
  return parseFloat((num * 100) / 100).toFixed(decimals);
};
