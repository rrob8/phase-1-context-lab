/* Your Code Here */
function createEmployeeRecord (array) {
    let employee ={}
     employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    
    return employee
}
let grayWorm = ["Gray", "Worm", "Security", 15]
grayWorm = createEmployeeRecord(grayWorm)


function createEmployeeRecords (arrays) {
    let list = []
    for ( let array of arrays) {
    let newRecord =    createEmployeeRecord(array)
    list.push(newRecord)
    }
    return list
}

function createTimeInEvent (time) {
    let employee = this

    let timeObj = {}
    timeObj.type = 'TimeIn'
    timeObj.date = time.split(' ')[0]
    timeObj.hour = parseInt(time.split(' ')[1])
    
    employee.timeInEvents.push(timeObj)
    
    return employee
}

// createTimeInEvent.call(grayWorm,'2014-02-28 1400')

function createTimeOutEvent (time) {
    let employee = this

    let timeObj = {}
    timeObj.type = 'TimeOut'
    timeObj.date = time.split(' ')[0]
    timeObj.hour = parseInt(time.split(' ')[1])
    employee.timeOutEvents.push(timeObj)
    
    return employee
}

// createTimeOutEvent.call(grayWorm,'2014-02-28 2100')


function hoursWorkedOnDate (date) {

let hoursWorked =''
let timesIn = this.timeInEvents.filter((event) => {
    if (event.date === date) {
        return event
    }
})


let timesOut = this.timeOutEvents.filter((event)=> {
    if (event.date === date) {
        return event
    }
})

if (timesIn[0].date === timesOut[0].date) {
 hoursWorked = (timesOut[0].hour - timesIn[0].hour)/100
 
}

return hoursWorked
}



function wagesEarnedOnDate (date) {
    
    let rate = this.payPerHour
    
    let hoursWorked = hoursWorkedOnDate.call(this,date)
    let wages = rate*hoursWorked
    console.log(wages)
    return wages
}



function findEmployeeByFirstName (array, name) {
    // let employees = createEmployeeRecords(array)
    
   let result = array.find((person)=>{return person.firstName === name })
    // console.log(result[0].familyName)
   
    return result
 }
    


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function calculatePayroll (array) {
    
    let payroll = array.reduce((accumulator, currentValue) => accumulator + allWagesFor.call(currentValue), 0)
    return payroll
}

