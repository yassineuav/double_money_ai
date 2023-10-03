import { calculateMonthData } from '@/app/data_server';
import React from 'react'


const ModedDatePicker = ({ isOpen, onClose, openInfoModal }) => {
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const [selectedMonth, setSelectedMonth] = useState("");
    const [doublingTime, setDoublingTime] = useState("");
    const [balance, setSeedBalance] = useState("")
    const [interst, setCompoundInterst] = useState("")
  
  
    const createGaolData = async () => {
      try {
        const docRef = await addDoc(collection(db, "months"), {
          month: selectedMonth,
        });
        // console.log("Document written with ID: ", docRef.id);
        openInfoModal({
          id: 1,
          title: "Data Saved Successfully",
          message: `The ${selectedMonth} month saved succefully (@_-)`,
          isSuccess: true,
        });
        onClose();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  
    const handleSaveMonth = async () => {
      
      const querySnapshot = await getDocs(collection(db, "months"));
      let isExist = false;
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().month}`);
        if (doc.data().month === selectedMonth) {
          isExist = true;
        }
      });
      if (!isExist) {
        createGaolData()
      } else {
        openInfoModal({
          id: 1,
          title: "Already Exist!!",
          message: `The ${selectedMonth} month is already exist!`,
          isSuccess: false,
        });
        // console.log("month is already exist ", isExist)
      }
    };
  
    const handleSaveGoalData = () => {
      
        //  const goal = calculateMonthData("400", "2", "10", "10/03/2023","");
        //  console.log("goal data: ", goal);
    }
  
  
    return isOpen ? (
      <div
        className={`fixed z-50 w-full p-4 inset-0 flex items-center justify-center max-h-full${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none "
        }`}
      >
        <div className="flex flex-col gap-2 w-full rounded-lg shadow bg-gray-700 justify-center">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl m-1 font-medium text-gray-900 dark:text-white">
              Add new Month
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-200 border border-gray-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="text-white text-md m-1">Select a Month</div>
            <div className="w-40 shadow-sm rounded-md overflow-y-auto h-36 border border-gray-500">
              <ul className="p-1 text-center">
                {allMonths.map((month, index) => (
                  <li key={index} className="h-8 text-center">
                    <button
                      onClick={() => setSelectedMonth(month)}
                      className={`p-1 w-full h-8 border-b border-gray-400 text-center ${
                        month === selectedMonth
                          ? "bg-blue-600 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {month}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-1 m-2">
              <div className="text-white text-md m-1 text-center">Double times</div>
              <label className="flex flex-col items-center border border-gray-500 p-2 rounded-md ">
                <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                  Number of Doubling times
                </span>
                <input
                  onChange={(e) => {
                    setDoublingTime(e.target.value);
                  }}
                  type="number"
                  name="double_times"
                  className="mt-1 p-1 w-28 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 block rounded-md text-sm text-white"
                  placeholder="double times"
                />
              </label>
            </div>
  
            <div className="text-white text-md m-1">Compounding Interst Data</div>
  
            <div className="border border-gray-500 rounded-md m-1">
              <div className="grid grid-cols-2 gap-1 m-2">
                <label className="block">
                  <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                    Seed Balance
                  </span>
                  <input
                    onChange={(e) => {
                      setSeedBalance(e.target.value);
                    }}
                    type="text"
                    name="amount"
                    className="mt-1 p-1 w-32 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 text-white focus:ring-sky-400 block rounded-md text-sm focus:ring-1"
                    placeholder="your invest $"
                  />
                </label>
  
                <label className="block">
                  <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                    Coumpound interest
                  </span>
                  <input
                    onChange={(e) => {
                      setCompoundInterst(e.target.value);
                    }}
                    type="text"
                    name="compound"
                    className="mt-1 p-1  bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-400 block w-full rounded-md text-sm focus:ring-1 text-white"
                    placeholder="copmoud 2=100%"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row m-1 p-1 justify-between w-full ">
            <button
              onClick={onClose}
              className="rounded-md w-20 h-7 bg-red-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveGoalData}
              className="rounded-md w-20 h-7 bg-sky-500 text-white mr-2"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };

export default ModedDatePicker;
