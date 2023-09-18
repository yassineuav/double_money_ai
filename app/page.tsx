"use client";
import Image from "next/image";
import { useState } from "react";

interface BalanceType{
  balance: string,
  date: string,
  day:string,
}

export default function Home() {
  const [amount, setAmount] = useState("100");
  // const [percent, setPercent] = useState("2");

  const [data, setData] = useState<BalanceType[]>([]);

  function toMoney(number: number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  function listWeekdaysToEndOfMonth() {
    const currentDate = new Date(); // Get the current date
    const currentMonth = currentDate.getMonth(); // Get the current month
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdaysList = [];
  
    // Loop through the days of the current month
    for (let day = currentDate.getDate(); ; day++) {
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

  const handleCalculate = () => {
    try {
      let balance = parseInt(amount);
      let doublePercent = 2
      // console.log("balance", balance);
      let newData:BalanceType[] = [];
      // Convert the number to a currency format
      const weekdays = listWeekdaysToEndOfMonth();
      for (var i = 0; i < weekdays.length; i++) {
        newData = [...newData, {"balance":toMoney(balance), "day":weekdays[i].day, "date":weekdays[i].date} ];
        balance = balance * doublePercent;
        // console.log("day", weekdays[i].date, weekdays[i].date)
      }
      setData(newData);
      // setData(newData);
      console.log("new data", newData);
    } catch (e) {
      console.log(e);
    }

    console.log("data", data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm   lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Doubling your money is A big life change&nbsp;
          <code className="font-mono font-bold">just Do it</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="m-1">
          <label className="block">
            <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
              Your invest Amount
            </span>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="text"
              name="amount"
              className="mt-1 px-3 py-2 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="your invest"
            />
          </label>
        </div>
        

        <div className="m-2">
          <button
            onClick={handleCalculate}
            className="rounded-full w-48 h-10 bg-sky-500 text-white m-2 "
          >
            Calulate
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <table className="w-full bg-gradient-to-b from-blue-500 to-green-500">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-300 dark:text-white">
                Times
              </th>
              <th className="px-4 py-2 text-left text-gray-300 dark:text-white">
                Date
              </th>
              <th className="px-4 py-2 text-left text-gray-300 dark:text-white">
                Balance
              </th>
         
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-700 
                  ${ (index > 4 && index < 10) && "bg-yellow-700"}
                  ${ (index > 9 && index < 15) && "bg-orange-900"}
                  ${ index < 5 && "bg-green-500"} 
                    `}
                >
                  <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 text-gray-300 text-xl text-center">{item.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            step 1{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>explain steps</p>
        </a>
      </div>
    </main>
  );
}
