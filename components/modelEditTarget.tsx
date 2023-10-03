import toMoney from '@/app/data_server';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import firebase_app from './firebaseConfig';


const ModelEditTarget = ({ isOpen, onClose, openInfoModal, targetInfo }) => {
    const db = getFirestore(firebase_app)
    const [EditedAmount, setEditedAmount] = useState("")
    
    const updateGaol = async () => {
        try {
         
          let amount = toMoney(parseInt(EditedAmount))
          const editAmountRef = doc(db, "double_it", targetInfo.uid);
          await updateDoc(editAmountRef, {
            current: amount
          });
 
          openInfoModal({
            id: 1,
            title: "Data Saved Successfully",
            message: `The ${amount} month saved succefully (@_-)`,
            isSuccess: true,
          });
          onClose();
        } catch(e){ console.error("Error adding document: ", e);}
      };
    
  
    return (
    <div
      className={`fixed z-50 w-full p-4 inset-0 flex items-center justify-center max-h-full${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none "
      }`}
    >
      <div className="flex flex-col gap-2 w-full rounded-lg shadow bg-gray-700 justify-center">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl m-1 font-medium text-gray-900 dark:text-white">
            Edit Target For {targetInfo.date}
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
          <div className="text-white text-md m-1">The Gaol is {targetInfo.target}  </div>
          
          <div className="flex flex-col gap-1 m-2">
            <label className="flex flex-col items-center border border-gray-500 p-2 rounded-md ">
              <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                Enter the total account balance
              </span>
              <input
                onChange={(e) => {
                  setEditedAmount(e.target.value);
                }}
                name="current"
                className="mt-1 p-1 w-28 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 block rounded-md text-sm text-white"
                // value={targetInfo.current}
                placeholder={targetInfo.current}
              />
            </label>
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
            onClick={updateGaol}
            className="rounded-md w-20 h-7 bg-sky-500 text-white mr-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModelEditTarget
