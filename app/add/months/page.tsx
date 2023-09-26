"use client";
import firebase_app from "@/components/firebaseConfig";
import FloatingActionButton from "@/components/foatingActionButton";
import { MonthsType } from "@/types";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Months = () => {
  const [months, setMonths] = useState<MonthsType[]>([]);
  const [loading, setloading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const db = getFirestore(firebase_app);

  useEffect(() => {
    async function fetchMonths() {
      const querySnapshot = await getDocs(collection(db, "months"));
      let newData: MonthsType[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().month}`);
        newData = [
          ...newData,
          { month: doc.data().month, id: doc.id, active: false },
        ];
      });
      setMonths(newData);
    }
    fetchMonths();
  }, []);
  const handleFetchMonthData = async (dataMonth: MonthsType) => {
    // fetch month data from firebase
    const updatedMonth = months.map((item) => {
      if (item.id === dataMonth.id) {
        return { ...item, active: true }; // Update the name for the object with id 2
      } else {
        return { ...item, active: false };
      }
      // return obj;  // Return unchanged for other objects
    });

    setMonths(updatedMonth);
    // fetchMonthsData()
    // console.log("fetch month data", updatedMonth)
  };

  return (
    <div className="flex min-h-screen flex-col items-center ">
      CRUD Months
      <MonthModal isOpen={isModalOpen} onClose={handleModalToggle} />
      <div className="grid w-full grid-cols gap-1 m-2 p-1">
        {months &&
          months.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFetchMonthData(item)}
              className={`flex justify-between rounded-md m-1 p-1 border border-neutral-500 
         ${
           item.active
             ? "bg-blue-800 border-blue-300"
             : "hover:bg-neutral-600/30 "
         }`}
            >
              <div className="">
                <h2 className={`text-md font-semibold text-white`}>
                  {item.month}
                </h2>
                <div className="text-xs text-white">created at:</div>
                <div className="text-xs text-white">last update:</div>
              </div>
              <div className="justify-end text-md font-mono font-semibold">
                <div className="text-red-600 mb-3">Delete</div>
                <div>Edit</div>
              </div>
            </div>
          ))}
      </div>
      <div
        onClick={handleModalToggle}
        className="border border-blue-500 rounded-md m-1 p-1 text-sm bg-blue-700 text-white"
      >
        {" "}
        Add Month
      </div>
      <div
        onClick={handleModalToggle}
        className="flex fixed bottom-20  right-8 items-center justify-center w-10 h-10 font-medium bg-green-700 rounded-full"
      >
        <svg
          className="w-4 h-4 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default Months;

const MonthModal = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleDoneClick = () => {
    if (inputValue.trim() === "") {
      setError("Please enter a value.");
    } else {
      console.log("Input value:", inputValue);
      onClose();
    }
  };

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

             <div className="flex flex-col gap-4 w-full  items-center
             border border-gray-300">
          <label className="block ">
            <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
              Enter month
            </span>
            
            <input
            //   onChange={(e) => { setAmount(e.target.value);}}
              type="text"
              name="amount"
              className="mt-1 p-1 w-40 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-400 block  rounded-md text-sm focus:ring-1"
              placeholder="Month"
            />
            </label>
            
          <button
                className="w-40 h-7 text-white  focus:ring-4 focus:outline-none rounded-lg text-sm p-1 text-center bg-blue-600 hover:bg-blue-700 "
              >
                set current month
              </button>  
              
              

              </div>

      
              <div className="flex flex-row m-1 p-1 justify-between w-full ">

                <button
                  className="rounded-md w-20 h-7 bg-red-600 text-white "
                >
                  Cancel
                </button>                
                <button
                  //   onClick={handleCalculate}
                  className="rounded-md w-20 h-7 bg-sky-500 text-white mr-2"
                >
                  Done
                </button>
</div>
      </div>
    </div>
  ) : null;
};

const MonthModalTest = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleDoneClick = () => {
    if (inputValue.trim() === "") {
      setError("Please enter a value.");
    } else {
      console.log("Input value:", inputValue);
      onClose();
    }
  };

  return isOpen ? (
    <div
      className={`fixed inset-0 flex items-center justify-center  z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none "
      }`}
    >
      <div className="modal-overlay"></div>

      <div className="modal-container flex flex-row m-2 p-2 border border-sky-100 rounded">
        <button className="modal-close " onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-content">
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter a value"
            value={inputValue}
            onChange={handleInputChange}
          />
          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end mt-4">
            <button className="btn mr-2" onClick={handleDoneClick}>
              Done
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

// export default Modal;