import { BalanceType } from "@/types";

function toMoney(number: number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
}

function listWeekdaysToEndOfMonth() {
    const currentDate = new Date(); // Get the current date
    const currentMonth = 9 //currentDate.getMonth(); // Get the current month
    
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdaysList = [];
    // start date
    const startDate = new Date("10/01/2023")
    // Loop through the days of the current month
    // currentDate.getDate()
    // startDate.getDate()
    
    for (let day =  startDate.getDate(); ; day++) {
      const date = new Date(currentDate.getFullYear(), currentMonth, day);
  
      // Check if the date is in the same month
      if (date.getMonth() !== currentMonth) {
        break; // Exit the loop when the month changes
      }
  
      // Check if the date is a weekday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Weekday (Monday through Friday)
        weekdaysList.push({
          date: date.toDateString(),
          day: weekdays[dayOfWeek],
        });
      }
    }
  
    return weekdaysList;
  }

export const calculateMonthData = (seed:string, interst:string, double:string) => {
  try {
    let balance = parseInt(seed);
    let compoundInterst = parseInt(interst);
    let doubleTimes = parseInt(double);
    // console.log("balance", balance);
    let newData:BalanceType[] = [];
    // Convert the number to a currency format
    const weekdays = listWeekdaysToEndOfMonth();
    for (var i = 0; i < weekdays.length; i++) {
      newData = [...newData, {"id":i, "target":toMoney(balance), "check": "pending","current":toMoney(100), "day":weekdays[i].day, "date":weekdays[i].date.replace('2023', '')} ];
      balance = balance * compoundInterst;
      // console.log("day", weekdays[i].date, weekdays[i].date)
    }
    return newData
    // setData(newData);
    // console.log("new data", newData);
  } catch (e) {
    console.log(e);
  }

//   console.log("data", data);
}

// function listWeekdaysToEndOfMonth() {
//   const currentDate = new Date(); // Get the current date
//   const currentMonth = currentDate.getMonth(); // Get the current month
//   const weekdays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const weekdaysList = [];

//   // Loop through the days of the current month
//   for (let day = currentDate.getDate(); ; day++) {
//     const date = new Date(currentDate.getFullYear(), currentMonth, day);

//     // Check if the date is in the same month
//     if (date.getMonth() !== currentMonth) {
//       break; // Exit the loop when the month changes
//     }

//     // Check if the date is a weekday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
//     const dayOfWeek = date.getDay();
//     if (dayOfWeek >= 1 && dayOfWeek <= 5) {
//       // Weekday (Monday through Friday)
//       weekdaysList.push({
//         date: date.toDateString(),
//         day: weekdays[dayOfWeek],
//       });
//     }
//   }

//   return weekdaysList;
// }

// function datamm(){
// try {
//   let balance = parseInt(amount);
//   let doublePercent = 2;
//   // console.log("balance", balance);
//   let newData: BalanceType[] = [];
//   // Convert the number to a currency format
//   const weekdays = listWeekdaysToEndOfMonth();
//   for (var i = 0; i < weekdays.length; i++) {
//     newData = [
//       ...newData,
//       {
//         id: i+1,
//         target: toMoney(balance),
//         day: weekdays[i].day,
//         date: weekdays[i].date,
//       },
//     ];
//     balance = balance * doublePercent;
//     // console.log("day", weekdays[i].date, weekdays[i].date)
//   }
//   setData(newData);
//   // setData(newData);
//   console.log("new data", newData);
// } catch (e) {
//   console.log(e);
// }

// console.log("data", data);
// }
