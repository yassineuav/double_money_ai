'use client'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import firebase_app from '@/components/firebaseConfig';
import { BalanceType, MessageType } from '@/types';
import LoadingSpinner from '@/components/loadingSpinner';
import InfoModal from '@/components/infoModal';
import toMoney from '@/app/data_server';
import ModelEditTarget from '@/components/modelEditTarget';

const db = getFirestore(firebase_app)


export default function Home() {
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
    <div className="flex h-screen items-center">
        {isModalOpen && 
        <ModelEditTarget
            targetInfo={editTarget}
            isOpen={isModalOpen}
            onClose={handleModalToggle}
            openInfoModal={handleInfo}
        />}
         {isInfoModalOpen && (
          <InfoModal closeModal={handleInfoModalToggle} info={infoModalData} />
        )}
            { loading ?  <div className='w-screen h-screen items-center'><LoadingSpinner /></div> :
            <div className="flex flex-col p-2 md:w-full h-screen ">
              {/* <div className='mt-20 text-white text-md border border-gray-400 rounded-md'>
                {JSON.stringify(data)}
              </div> */}
                {data.length !== 0 ? (
                <div className='flex flex-col gap-1 mt-12 h-screen'>
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
  );
}
