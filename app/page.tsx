"use client";
import Modal from "@/components/modal";
import { BalanceType } from "@/types";
import { useState } from "react";

// interface BalanceType {
//   balance: string;
//   date: string;
//   day: string;
// }

export default function Home() {
  const [amount, setAmount] = useState("100");
  // const [percent, setPercent] = useState("2");

  const [data, setData] = useState<BalanceType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function toMoney(number: number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  function listWeekdaysToEndOfMonth() {
    const currentDate = new Date(); // Get the current date
    const currentMonth = currentDate.getMonth(); // Get the current month
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
      let doublePercent = 2;
      // console.log("balance", balance);
      let newData: BalanceType[] = [];
      // Convert the number to a currency format
      const weekdays = listWeekdaysToEndOfMonth();
      for (var i = 0; i < weekdays.length; i++) {
        newData = [
          ...newData,
          {
            id: i+1,
            target: toMoney(balance),
            day: weekdays[i].day,
            date: weekdays[i].date,
          },
        ];
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className="z-10 w-full items-center justify-between font-mono flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border bg-gradient-to-b from-zinc-700 backdrop-blur-2xl border-neutral-800 rounded-xl text-xs">
          Doubling your Money is A Big Life Change&nbsp;
          <code className="font-bold">Just Do It</code>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <table className="w-full bg-gradient-to-b from-slate-900 to-slate-600">
          <thead>
            <tr className="text-white text-center">
              <th>Times</th>
              <th>Date</th>
              <th>Target</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="text-center">{item.id}</td>
                  <td className="">{item.date?.replace("2023", "")}</td>
                  <td className="text-gray-300 text-md text-center">
                    {item.target}
                  </td>
                  <td className="text-gray-200 text-md text-center font-bold">
                    {item.target}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="border border-blue-300 rounded-md m-1">
        <div className="grid grid-cols-2 gap-1 m-2">
            <label className="block">
              <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                Your Amount
              </span>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                name="amount"
                className="mt-1 p-1 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-400 block w-full rounded-md text-sm focus:ring-1"
                placeholder="your invest $"
              />
            </label>

            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={openModal}
            >
              Open Modal
            </button>

                <div className="flex flex-row gap-1">


            <button
              onClick={handleCalculate}
              className="rounded-md w-20 h-7 bg-sky-500 text-white "
            >
              Calulate
            </button>

            <button
              onClick={() => (setData([]))}
              className="rounded-md w-20 h-7 bg-red-600 text-white "
            >
              Reset
            </button>

            </div>
          
        </div>
      </div>
      <div className="mb-32 grid text-center w-full grid-cols-4 ">
        <a
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-xl font-semibold`}>
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
