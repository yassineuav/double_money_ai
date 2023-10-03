'use client'
import React, { useState } from 'react'
import { calculateMonthData } from "../../data_server"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import firebase_app from '@/components/firebaseConfig';
import { BalanceType } from '@/types';

const db = getFirestore(firebase_app)

const CurrentMonth = () => {
    const [data, setData] = useState<BalanceType[]>([]);

    const  handleSaveDataGaol = async () =>  {
        const goal = calculateMonthData({seed:"200", interst:"2", double:"10", start_date:"10/02/2023", end_date: "11/01/2023"});
        // console.log("goal data: ", goal);
        goal?.forEach(async (item) => {
            const docRef = await addDoc(collection(db, "double_it"), item);
            console.log("Document written with ID: ", docRef.id);
        })

    }

    async function handleFetchData() {
        const querySnapshot = await getDocs(collection(db, "double_it"));
        let newData: BalanceType = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            newData = [...newData, doc.data()];
        });
        const sortedData = newData.sort((a, b) => a.id - b.id);
        console.log("is data empty: ", querySnapshot.empty)
        console.log("data", sortedData)
        setData(sortedData)
    }

    async function handleDeleteDataGaol() {
        try {
            const querySnapshot = await getDocs(collection(db, "double_it"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                deleteDoc(doc.ref);
            });
            console.log('Collection successfully deleted.');
        } catch (error) {
            console.error('Error deleting collection: ', error);
        }
    }

   

    return (

        <div className="flex">
            <div className="flex flex-col p-2  justify-center items-center h-screen w-screen">
            
                    {data.length !== 0 ? (<div className='grid grid-cols-5 gap-1'>{data.map((item) => (
                        <div key={item.id} className='border border-gray-500 text-sm text-center m-1 p-1 rounded-md'>
                            {item.date?.replace('Oct', '')}
                        </div>))
                        }</div>):(<div className=' ring-pink-400 mb-4 text-gray-300'>no data</div>)}
                        
                    <div className='text-gray-400 font-bold mb-4 border border-gray-400 rounded-md p-2'
                    onClick={handleFetchData}>fetch data</div>            
                <div
                    className="w-48 m-4 font-semibold text-center text-white bg-blue-700  rounded-md focus:bg-blue-500 p-1 shadow-md shadow-yellow-600"
                    onClick={handleSaveDataGaol}>
                        creat data
                </div>
                <div
                    className="w-48 font-semibold text-center text-white bg-red-700 rounded-md focus:bg-red-500 m-1 p-1 shadow-md shadow-red-600"
                    onClick={handleDeleteDataGaol}
                >delete all data
                </div>
            </div>
        </div>
    );
}

export default CurrentMonth;
