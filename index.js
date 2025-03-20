// Your code here
function createEmployeeRecord(emplyArr) {
    return {
        firstName: emplyArr[0],
        familyName: emplyArr[1],
        title: emplyArr[2],
        payPerHour: emplyArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(emplyArr) {
    return emplyArr.map(createEmployeeRecord)
}

function createTimeInEvent(emply, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    emply.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return emply
}
function createTimeOutEvent(emply, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    emply.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return emply
}
function hoursWorkedOnDate(emply, date) {
    let timeIn = emply.timeInEvents.find(function(event){ 
        return event.date == date
    })
    let timeOut = emply.timeOutEvents.find(function(event){
        return event.date === date
    })
    const totalWorkingHours = (timeOut.hour - timeIn.hour) / 100
    return totalWorkingHours
}
function wagesEarnedOnDate(emply, date) {
    let totalWorkingHours = hoursWorkedOnDate(emply, date)
    return totalWorkingHours * emply.payPerHour
}
function allWagesFor(emply) {
    return emply.timeInEvents.reduce(function (total, event){
        return total + wagesEarnedOnDate(emply, event.date);
    }, 0);
}
function calculatePayroll(emplyArr) {
    return emplyArr.reduce((total, emply) => {
        return total + allWagesFor(emply);
    }, 0);
}