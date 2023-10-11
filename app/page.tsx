'use client'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import firebase_app from '@/components/firebaseConfig';
import { BalanceType, MessageType } from '@/types';
import LoadingSpinner from '@/components/loadingSpinner';
import InfoModal from '@/components/infoModal';
import toMoney, { calculateMonthData } from '@/app/data_server';
import ModelEditTarget from '@/components/modelEditTarget';

const db = getFirestore(firebase_app)


export default function Home() {
    const [data, setData] = useState<BalanceType[]>([]);
    const [loading, setloading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState()

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddModalToggle = () => {
        // check if double it exist
        handleInfo({
            id: 1,
            title: "Already Exist!!",
            message: `This month data is already exist!`,
            isSuccess: false,
        });
        
        // setIsAddModalOpen((prev) => !prev);
        console.log("test, ", isAddModalOpen)
    };


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

        const q = query(collection(db, "double_it"), orderBy('id', 'asc'))
        const querySnapshot = await getDocs(q);
        let newData: BalanceType[] = [] 
        
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            newData = [...newData, doc.data()];
        });
        // const sortedData = newData.sort((a: number, b: number) => a.id - b.id);
        // console.log("is data empty: ", querySnapshot.empty)
        // console.log("data", sortedData)
        setData(newData)
        setloading(false);
    }

    useEffect(() => {
        handleFetchData()
    }, []);

    return (
        <div className="flex h-screen flex-col items-center">
            {isModalOpen &&
                <ModelEditTarget
                    targetInfo={editTarget}
                    isOpen={isModalOpen}
                    onClose={handleModalToggle}
                    openInfoModal={handleInfo}
                />}
            {isAddModalOpen &&
                <ModalAddMonthData
                    isOpen={isAddModalOpen}
                    onClose={handleAddModalToggle}
                    openInfoModal={handleInfo}
                />
            }
            {isInfoModalOpen && (
                <InfoModal closeModal={handleInfoModalToggle} info={infoModalData} />
            )}
            {loading ? <div className='w-screen h-screen items-center'><LoadingSpinner /></div> :
                <div className="flex flex-col p-2 w-full h-screen ">
                    {/* <div className='mt-20 text-white text-md border border-gray-400 rounded-md'>
                {JSON.stringify(data)}
              </div> */}
                    {data.length !== 0 ? (
                        <div className='flex flex-col gap-1 mt-5 h-screen'>
                            {data.map((item, index) => (
                                <div key={index}
                                    className='w-full shadow-md shadow-slate-500 mb-2 rounded-md'>
                                    <div className='flex justify-between'>
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
                            ) ) }
                            <div className='flex items-center w-full border mt-40'>
                                test data
                            </div>
                        </div>
                    ) : (
                    <div className='flex items-center justify-center w-full h-full  '>
                        <div className='text-emerald-300 shadow-md text-md'>No Data</div>
                    </div>)}
                </div>
            }

            <div
                onClick={handleFetchData}
                className="flex fixed bottom-20 right-40 items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full text-white">
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
            <div
                onClick={handleAddModalToggle}
                className="flex fixed bottom-20 right-4 items-center justify-center w-10 h-10 font-medium bg-green-600 rounded-full"
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
}


const ModalAddMonthData = ({ isOpen, onClose, openInfoModal }) => {

    const [doublingTime, setDoublingTime] = useState("");
    const [balance, setSeedBalance] = useState("")
    const [interst, setCompoundInterst] = useState("")
    const [startDate, setStartDate] = useState("")


    const createGaolData = async () => {
        try {
            const docRef = await addDoc(collection(db, "months"), {
                // month: selectedMonth,
            });
            // console.log("Document written with ID: ", docRef.id);
            openInfoModal({
                id: 1,
                title: "Data Saved Successfully",
                message: `The month saved succefully (@_-)`,
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
            if (doc.data().month === "") {
                isExist = true;
            }
        });
        if (!isExist) {
            createGaolData()
        } else {
            openInfoModal({
                id: 1,
                title: "Already Exist!!",
                message: `The month is already exist!`,
                isSuccess: false,
            });
            // console.log("month is already exist ", isExist)
        }
    };

    const handleSaveGoalData = () => {
        const goal = calculateMonthData({ seed: balance, interst: interst, double: "", start_date: startDate, end_date: "" });
        goal?.forEach(async (item) => {

            const docRef = await addDoc(collection(db, "double_it"), item);
            await setDoc(docRef, { ...item, uid: docRef.id });
            console.log("Document written with ID: ", docRef.id);
        });

        onClose();

        openInfoModal({
            id: 1,
            title: "Data Saved Successfully",
            message: `The month saved succefully (@_-)`,
            isSuccess: true,
        });
        // console.log("data", {"start date":startDate, "balance":balance, "interst":interst})
    }


    return isOpen ? (

        <div
            className={`fixed z-50 w-full p-4 inset-0 flex items-center justify-center max-h-full${isOpen ? "opacity-100" : "opacity-0 pointer-events-none "}`}
        >
            <div className="flex flex-col gap-2 w-full rounded-lg shadow bg-gray-700 justify-center">
                <div className="flex justify-between mb-4">
                    <h3 className="text-xl m-1 font-medium text-gray-900 dark:text-white">
                        Add new Month
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-200 border border-gray-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14" >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col w-full items-center">
                    <div className="text-white text-md m-1 text-center">Start/End Date</div>

                    <div className="flex flex-row gap-2 p-2 m-2 items-center border border-gray-500 rounded-md">

                        <label className="flex flex-col ">
                            <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                                Start Date
                            </span>
                            <input
                                // setDoublingTime(e.target.value);
                                onChange={(e) => { setStartDate(e.target.value) }}
                                type="text"
                                name="start_date"
                                className="mt-1 p-1 w-28 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 block rounded-md text-sm text-white"
                                placeholder="10/01/2023"
                            />
                        </label>

                        <label className="flex flex-col items-centerp-2 rounded-md "></label>

                        {/* <label className="flex flex-col items-centerp-2 rounded-md ">
                <span className="before:content-['*'] before:mr-1 before:text-red-500 block text-sm font-medium text-slate-400">
                  End Date
                </span>
                <input         
                  // onChange={(e) => { setStartDate(e.target.value);}}
                  type="text"
                  name="end_date"
                  className="mt-1 p-1 w-28 bg-gray-500 border shadow-sm border-slate-300 placeholder-slate-200 focus:outline-none focus:border-sky-500 block rounded-md text-sm text-white"
                  placeholder="10/30/2023"
                /> </label> */}

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
