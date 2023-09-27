"use client";
import firebase_app from "@/components/firebaseConfig";
import InfoModal from "@/components/infoModal";
import LoadingSpinner from "@/components/loadingSpinner";
import { MonthsType, MessageType } from "@/types";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

const db = getFirestore(firebase_app);

const Months = () => {
  const [months, setMonths] = useState<MonthsType[]>([]);
  const [seletedMonth, setSelectedMonth] = useState<MonthsType>();
  const [loading, setloading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState<MessageType>();

  const handleInfoModalToggle = () => {
    setIsInfoModalOpen((prev) => !prev);
  };

  const handleInfo = (dataTest:MessageType) => {
    // console.log("data test : ", dataTest)
    setInfoModalData(dataTest)
    setIsInfoModalOpen((prev) => !prev);

  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDeleteModal = (month:MonthsType) => {
    setIsDeleteModalOpen((prev) => !prev);
    setSelectedMonth(month)
  };
 

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
      setloading(false);
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
    <>
    
    <div className="flex min-h-screen flex-col items-center ">
      <ModalMonthPicker 
        isOpen={isModalOpen} 
        onClose={handleModalToggle}
        openInfoModal={handleInfo}

        />
      {isDeleteModalOpen && <DeleteMonthModal  openInfoModal={handleInfo} closeModal={toggleDeleteModal} MonthData={seletedMonth}/>}
      {isInfoModalOpen && <InfoModal closeModal={handleInfoModalToggle} info={infoModalData}/>}

      { loading? <LoadingSpinner /> :
      (<div className="grid w-full grid-cols gap-1 m-2 p-1">
        {months &&
          months.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFetchMonthData(item)}
              className={`flex justify-between rounded-md mx-1 p-1 border border-neutral-500 
         ${
           item.active
             ? "bg-blue-800 border-blue-300"
             : "hover:bg-neutral-600/30 " }`}
            >
              <div className="">
                <h2 className={`text-md font-semibold text-white`}>
                  {item.month}
                </h2>
                <div className="text-xs text-white">created at:</div>
                <div className="text-xs text-white">last update:</div>
              </div>
              <div className="justify-end text-md font-mono font-semibold">
                <button 
                onClick={() => toggleDeleteModal(item)}
                className="text-red-600 mb-3">Delete</button>
                <div>Edit</div>
              </div>
            </div>
          ))}
      </div>)}
      <div
        onClick={handleInfoModalToggle}
        className="border border-blue-500 rounded-md m-1 p-1 text-sm bg-blue-700 text-white"
      >
        {"show modal info"}
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
    </>
  );
};

export default Months;

const ModalMonthPicker = ({ isOpen, onClose, openInfoModal   }) => {
    const allMonths = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
     
      const [selectedMonth, setSelectedMonth] = useState('');

      const createMonth = async () => {
        try {
            const docRef = await addDoc(collection(db, "months"),{month:selectedMonth});
            // console.log("Document written with ID: ", docRef.id);
            openInfoModal({id:1, title:"Data Saved Successfully", message:`The ${selectedMonth} month saved succefully (@_-)`, isSuccess:true})
            onClose() 
        } catch (e) {
            console.error("Error adding document: ", e);
          }
      }
      const handleSaveMonth = async () => {
        const querySnapshot = await getDocs(collection(db, "months"));
        let isExist = false;
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data().month}`);
          if(doc.data().month === selectedMonth){
            isExist = true;
          }
        });
        if(!isExist){
            createMonth()
        }else {
            openInfoModal({id:1, title:"Already Exist!!", message:`The ${selectedMonth} month is already exist!`, isSuccess:false})
            // console.log("month is already exist ", isExist)
        }
        
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
              <div className="w-40 shadow-sm rounded-md overflow-y-auto h-36 border border-gray-500" >
                <ul className="p-1 text-center">
                  {allMonths.map((month, index) => (
                    <li key={index} className="h-8 text-center">
                      <button
                        onClick={() => setSelectedMonth(month)}
                        className={`p-1 w-full h-8 border-b border-gray-400 text-center ${month === selectedMonth ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                      >
                        {month}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-white text-md m-1">Start & End Date</div>
              
              <div className="text-white text-md m-1">Compounding data</div>
              <div className="border border-blue-300 rounded-md m-1">
      <div className="grid grid-cols-2 gap-1 m-2">
          <label className="block">
            <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
              Your Amount
            </span>
            <input
              onChange={(e) => {
                // setAmount(e.target.value);
              }}
              type="text"
              name="amount"
              className="mt-1 p-1 w-32 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-400 block w-full rounded-md text-sm focus:ring-1"
              placeholder="your invest $"
            />
          </label>
   
          <label className="block">
            <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
              Coumpound interest
            </span>
            <input
              onChange={(e) => {
                // setAmount(e.target.value);
              }}
              type="text"
              name="compound"
              className="mt-1 p-1  bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-400 block w-full rounded-md text-sm focus:ring-1"
              placeholder="copmoud 2=100%"
            />
          </label>
   
        
      </div>
    </div>
          </div>
          <div className="flex flex-row m-1 p-1 justify-between w-full ">
            <button onClick={onClose} className="rounded-md w-20 h-7 bg-red-600 text-white" >
                Cancel
            </button>                
            <button
                onClick={handleSaveMonth}
                className="rounded-md w-20 h-7 bg-sky-500 text-white mr-2">
                  Done
                </button>
            </div>
          </div>
      </div>
  ) : null;
};


const DeleteMonthModal = ({ closeModal, MonthData, openInfoModal } ) => {

    const handleDeleteMonth = async (month) => {
        console.log("delete ", month)
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, 'months', month.id));
            // console.log('Document successfully deleted!');
            closeModal()
            openInfoModal({id:1, title:"Delete Successfully", message:`The ${month.month} month is deleted (@_-)`, isSuccess:true})
        } catch (error) {
            closeModal()
            openInfoModal({id:1, title:"Error When deleting!!!", message:"somthing went wrong check network!! and try agian", isSuccess:false})
            console.error('Error removing document: ', error);
        }
    }

    return (
        <div id="popup-modal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-screen">
      <div className="bg-gray-800 rounded-lg shadow mx-4 w-full border border-gray-500">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white hover:text-gray-400"
            onClick={closeModal}
          >
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.293 10l-2.147 2.146a1 1 0 101.415 1.415L10.414 11l2.147 2.146a1 1 0 101.415-1.415L11.414 10l2.146-2.146a1 1 0 10-1.415-1.415L10.414 9l-2.147-2.146a1 1 0 10-1.415 1.415L9.414 10z"
              /> 
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mb-1">
              <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-16 h-16 text-yellow-500">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
    </svg>
        </div>

        <h3 className="m-2 text-lg font-bold text-gray-100 mb-2">Warning!</h3>
        <p className="text-gray-300 m-2">Are you sure you want to delete this month {MonthData.month}?</p>
        
        <div className="flex justify-between my-2 mx-1">
         
        
          <button
            onClick={() => handleDeleteMonth(MonthData)}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm inline-flex items-center px-2 py-1 text-center mr-2"
          >
            Yes, delete
          </button>
          <button
            type="button"
            className="text-gray-200 bg-gray-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-2 py-1 hover:text-gray-900 focus:z-10"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    );
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
