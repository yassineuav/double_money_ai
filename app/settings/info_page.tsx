"use client";

import { getFirestore, setDoc ,doc , collection, getDocs, addDoc } from "firebase/firestore";
 
import Modal from "@/components/modal";
import { BalanceType, MonthsType } from "@/types";
import { useState, useEffect } from "react";
import firebase_app from "@/components/firebaseConfig";
import { calculateMonthData } from "../data_server";



const Settings_old = () => {

  const [amount, setAmount] = useState("100");
  const [months, setMonths] = useState<MonthsType[]>([]);
  // const [percent, setPercent] = useState("2");

  const [data, setData] = useState<BalanceType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const db = getFirestore(firebase_app)

  async function fetchMonthsData() {  
    const querySnapshot = await getDocs(collection(db, "double_it"));
    let newData:BalanceType = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      newData = [...newData, doc.data()];
    }); 
    const sortedData = newData.sort((a, b) => a.id - b.id);
    // console.log("no data", querySnapshot.empty)
    console.log("data", sortedData)
    setData(sortedData)
  }


  useEffect( () =>{
    async function fetchMonths() {  
      const querySnapshot = await getDocs(collection(db, "months"));
      let newData:MonthsType[] = []
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().month}`);
        newData = [...newData, {month:doc.data().month, id:doc.id, active:false}];
      }); 
      setMonths(newData)
    }
    fetchMonths();
   } ,[]);
  
  
  const  handleFetchMonthData = async (dataMonth:MonthsType) => {
    // fetch month data from firebase
    const updatedMonth = months.map(item => {
      if (item.id === dataMonth.id) {
        return { ...item, active:true}; // Update the name for the object with id 2
      }else{
        return { ...item, active:false};
      }
      // return obj;  // Return unchanged for other objects
    });
    
    setMonths(updatedMonth)
    fetchMonthsData()
    // console.log("fetch month data", updatedMonth)


  };

 
  const handleCreateMonthData = async () => {
    // get months -> active id -> get month
    const currentActiveMonth =  months.find(item => item.active === true);

    console.log("current active month", currentActiveMonth)
    // calculate month
    const newData = calculateMonthData("50", "2", "10")
    // console.log("months data", newData)
    // update data doc to firebase
    newData?.forEach(async (item) =>  {
      const docRef = await addDoc(collection(db, "double_it"), item);
      console.log("Document written with ID: ", docRef.id); 

    })
    
  }


  const handleCalculate = () => {

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    <Modal isOpen={isModalOpen} onClose={closeModal} />
    <div className="z-10 m-4 w-full items-center justify-between font-mono flex">
      <p className="fixed left-0 top-0 flex w-full justify-center border bg-gradient-to-b from-zinc-700 backdrop-blur-2xl border-neutral-800 rounded-xl text-xs">
        Doubling your Money is A Big Life Change&nbsp;
        <code className="font-bold">Just Do It</code>
      </p>
    </div>

    <div className="grid text-center w-full grid-cols-4 gap-2">
      {months && months.map((item, index) => (
        <button
        key={index}
        onClick={() => handleFetchMonthData(item)}
        className={`group rounded-md border border-neutral-500 
        p-2 transition-colors hover:border-blue-700 
        hover:bg-neutral-600/30 ${ item.active ? "bg-blue-800" : "" }`}
       
      >
        <h2 className={`mb-1 text-md font-semibold`}>
          {item.month}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 text-sm opacity-50`}>explain steps</p>
      </button>

      ))}
      
    </div>

    <div className="grid grid-cols-1 gap-4">
      { data.length === 0 ? (
        <div className="flex flex-col gap-2 justify-center">
          <div className="text-white text-xlg">
            No Data for this month
          </div>
          <div 
          onClick={handleCreateMonthData}
          className="border rounded-md text-white border-blue-400 p-2 text-center bg-emerald-600">
            create data
          </div>
        </div>
      ) :(
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
      </table>)}
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

    <button
            className="w-28 h-10 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={openModal}
          >
            Open Modal
          </button>

    
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
  )
}

export default Settings_old
