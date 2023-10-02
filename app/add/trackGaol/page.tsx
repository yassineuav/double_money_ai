'use client'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import firebase_app from '@/components/firebaseConfig';
import { BalanceType, MessageType } from '@/types';
import LoadingSpinner from '@/components/loadingSpinner';
import InfoModal from '@/components/infoModal';


const db = getFirestore(firebase_app)

const trackGaol = () => {
    const [data, setData] = useState<BalanceType[]>([]);
    const [loading, setloading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState()


    const handleModalToggle = (item) => {
        setEditTarget(item)
        setIsModalOpen((prev) => !prev);
    };

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [infoModalData, setInfoModalData] = useState<MessageType>();
  
    const handleInfoModalToggle = () => {
      setIsInfoModalOpen((prev) => !prev);
    };
  
    const handleInfo = (dataTest: MessageType) => {
      // console.log("data test : ", dataTest)
      setInfoModalData(dataTest);
      setIsInfoModalOpen((prev) => !prev);
    };

    async function handleFetchData() {
        const querySnapshot = await getDocs(collection(db, "double_it"));
        let newData: BalanceType = []
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            newData = [...newData, doc.data()];
        });
        const sortedData = newData.sort((a:number, b:number) => a.id - b.id);
        // console.log("is data empty: ", querySnapshot.empty)
        console.log("data", sortedData)
        setData(sortedData)
        setloading(false);
    }


    useEffect(() => { 
        handleFetchData()
    }, []);



    return (
        <div className="flex mt-12 h-screen w-screen">
        {isModalOpen && 
        <ModalEditTarget
            targetInfo={editTarget}
            isOpen={isModalOpen}
            onClose={handleModalToggle}
            openInfoModal={handleInfo}
        />}
         {isInfoModalOpen && (
          <InfoModal closeModal={handleInfoModalToggle} info={infoModalData} />
        )}
            { loading ?  <div className='w-screen items-center'><LoadingSpinner /></div> :
            <div className="flex flex-col p-2 ">
            
                {data.length !== 0 ? (
                <div className='flex flex-col gap-1'>
                    {data.map((item, index) => (
                    <div key={index} 
                        className='w-full shadow-md shadow-slate-500 mb-2 rounded-md'>
                        <div className='flex justify-between '>
                            <div className='flex flex-col '>
                                <div className='w-7 h-7 p-1 -m-2 bg-slate-600 text-center font-semibold text-white text-sm rounded-full border  border-slate-800'>{item.id}</div>
                            <div className='mt-8 p-1'> 
                                    {item.date?.replace('Oct', '')}
                                </div>
                            </div>
                            
                            <div className=''></div>
                            <div className='text-sm p-1'>{item.check}</div>
                            <div className='text-center text-white font-semibold p-1'>{item.target}</div>
                            <div 
                                onClick={() => handleModalToggle(item)}
                                className='text-center text-white font-semibold p-1'>
                                {item.current}
                            </div>
                        </div>
                    </div>
                ))}</div>) : (<div className=' ring-pink-400 mb-4 text-gray-300'>no data</div>)}
            </div>
            
            }

            <div
                onClick={handleFetchData}
                className="flex fixed bottom-20 right-8 items-center justify-center w-10 h-10 font-medium bg-green-700 rounded-full">
                <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="28"
                    width="28">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M320 146s24.36-12-64-12a160 160 0 10160 160"
                    />
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M256 58l80 80-80 80"
                    />
                </svg>
            </div>
        </div>
    )

}

export default trackGaol;


const ModalEditTarget = ({ isOpen, onClose, openInfoModal, targetInfo }) => {
    const [EditedAmount, setEditedAmount] = useState("")
    
    const updateGaol = async () => {
        try {
        //   const docRef = await addDoc(collection(db, "months"), {
        //     month: selectedMonth,
        //   });
          // console.log("Document written with ID: ", docRef.id);
          openInfoModal({
            id: 1,
            title: "Data Saved Successfully",
            message: `The ${targetInfo.current} month saved succefully (@_-)`,
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
                //   setDoublingTime(e.target.value);
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
