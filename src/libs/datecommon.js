export var getDaysArray = function (start, end) {
  var endate = new Date(end).addDays(1)

  for (var arr = [], dt = new Date(start).addDays(1); dt <= endate; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
export var getDateArray = function (start, end) {
  var endate = new Date(end);

  for (var arr = [], dt = new Date(start); dt <= endate; dt.setDate(dt.getDate() + 1)) {
    let dateObj = new Date(dt);
    let dateStr = parseInt(dateObj.getDate()) < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
    let monthStr = (parseInt(dateObj.getMonth()) + 1) < 10 ? '0' + (parseInt(dateObj.getMonth()) + 1) : dateObj.getMonth();
    let date = dateStr + "/" + monthStr + "/" + dateObj.getFullYear();
    arr.push(date);
  }
  return arr;
};
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
export function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n
}