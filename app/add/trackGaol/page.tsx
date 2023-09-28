'use client'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import firebase_app from '@/components/firebaseConfig';
import { BalanceType } from '@/types';


const db = getFirestore(firebase_app)

const trackGaol = () => {
    const [data, setData] = useState<BalanceType[]>([]);
    
    async function handleFetchData() {
        const querySnapshot = await getDocs(collection(db, "double_it"));
        let newData: BalanceType = []
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            newData = [...newData, doc.data()];
        });
        const sortedData = newData.sort((a, b) => a.id - b.id);
        // console.log("is data empty: ", querySnapshot.empty)
        console.log("data", sortedData)
        setData(sortedData)
    }


    useEffect(() => { 
        handleFetchData()
    }, []);

    return (
        <div className="flex mt-12">
            <div className="flex flex-col p-2  h-screen w-screen">

                {data.length !== 0 ? (
                <div className='flex flex-col gap-1'>
                    {data.map((item, index) => (
                    <div key={index} 
                        className='w-full  shadow-sm shadow-slate-500 mb-2  rounded-md'>
                        <div className='flex justify-between bg-neutral-800'>
                        
                            <div className='flex flex-col '>
                                <div className='w-7 h-7 p-1 -m-2 bg-slate-600 text-center font-semibold text-white text-sm rounded-full border  border-slate-800'>{item.id}</div>
                            <div className='mt-8 p-1'> 
                                    {item.date?.replace('Oct', '')}
                                </div>
                            </div>
                            
                            <div className=''></div>
                            <div className='text-sm '>{item.check}</div>
                            <div className='text-center text-white font-semibold'>{item.target}</div>
                            <div className='text-center text-white font-semibold'>{item.current}</div>
                        </div>
                    </div>
                ))}</div>) : (<div className=' ring-pink-400 mb-4 text-gray-300'>no data</div>)}
                <div className='h-40 m-40' >Loading...</div>
            </div>
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
