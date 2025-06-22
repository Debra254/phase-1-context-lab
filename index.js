function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}


function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}


function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}


function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((e) => e.date === date);
  const timeOut = employee.timeOutEvents.find((e) => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}


function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}


function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}


function findEmployeeByFirstName(collection, firstName) {
  return collection.find((e) => e.firstName === firstName);
}


function calculatePayroll(employees) {
  return employees.reduce((total, e) => {
    return total + allWagesFor(e);
  }, 0);
}


module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll,
};
