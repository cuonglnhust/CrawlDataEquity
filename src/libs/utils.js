"use strict";

export function validateEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export function validateMobile(mobile) {
  // let regFirst = /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // let regInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  // return regFirst.test(mobile) || regInternational.test(mobile);
  let regexp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regexp.test(mobile);
}

export function validateUsername(username) {
  let regexp = /^\w+$/;
  return regexp.test(username.trim());
}

export function isTrimString(string1) {
  if (!string1 || string1.trim().length === 0) return true;
  return false;
}

export function validateMaxLength(string, length) {
  if (string.length > length) {
    return string.substring(0, length);
  }
  return false;
}

export function validateMinLength(string, length) {
  if (string.length < length) return true;
  return false;
}

export function isMatchString(string1, string2) {
  if (string1 === string2) return true;
  return false;
}

export function validateURL(url) {
  let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regex.test(url);
}
export function validateDate(date) {}

export function slugify(str) {
  let slug = "";
  // Change to lower case
  let titleLower = str.toLowerCase();
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
  // Letter "i"
  slug = slug.replace(/i|í|ì|ĩ|ỉ|ị/gi, "i");
  // Letter "d"
  slug = slug.replace(/đ/gi, "d");
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, "");
  // Change whitespace to "-"
  slug = slug.replace(/\s+/g, "-");

  return slug;
}

export function formartDateTime(time) {
  if (!time) return "";
  let d = new Date(time);
  let curr_date = d.getDate();
  let curr_month = d.getMonth() + 1;
  let curr_year = d.getFullYear();
  let curr_hours = d.getHours();
  let curr_minus = d.getMinutes();
  let curr_second = d.getSeconds();

  curr_minus = curr_minus < 10 ? "0" + curr_minus : curr_minus;
  curr_hours = curr_hours < 10 ? "0" + curr_hours : curr_hours;
  curr_date = curr_date < 10 ? "0" + curr_date : curr_date;
  curr_month = curr_month < 10 ? "0" + curr_month : curr_month;

  return curr_hours + ":" + curr_minus + "      " + curr_date + "/" + curr_month + "/" + curr_year;
}

export function formartOnlyDate(time) {
  if (!time) return "";
  let d = new Date(time);
  let curr_date = d.getDate();
  let curr_month = d.getMonth() + 1;
  let curr_year = d.getFullYear();

  curr_date = curr_date < 10 ? "0" + curr_date : curr_date;
  curr_month = curr_month < 10 ? "0" + curr_month : curr_month;

  return curr_date + "-" + curr_month + "-" + curr_year;
}

export function getUrlParameter(name, str) {
  if (!str) {
    return "";
  }

  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(str);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function formartDate(time) {
  if (!time) return "";
  let d = new Date(time);
  let curr_date = d.getDate();
  let curr_month = d.getMonth() + 1;
  let curr_year = d.getFullYear();
  let curr_hours = d.getHours();
  let curr_minus = d.getMinutes();
  let curr_second = d.getSeconds();

  curr_minus = (curr_minus < 10) ? '0'+curr_minus : curr_minus;
  curr_hours = (curr_hours < 10) ? '0'+curr_hours : curr_hours;
  curr_date = (curr_date < 10) ? '0'+curr_date : curr_date;
  curr_month = (curr_month < 10) ? '0'+curr_month : curr_month;

  return  curr_hours + ':' + curr_minus + '_' + curr_date + curr_month + curr_year ;
}

export function changeToSlug(title) {
  var slug;

  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  //In slug ra textbox có id “slug”
  return slug;
}
