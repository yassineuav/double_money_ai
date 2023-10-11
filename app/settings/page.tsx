'use client'
import React from 'react'



const Settings = () => {
  
  const status_data = [
    {'id':1, 'status':'gross fail','bgColor':'bg-red-600', 'percent':'-100%' },
    {'id':2, 'status':'loss fail','bgColor':'bg-orange-700', 'percent':'-50%'},
    {'id':3, 'status':'failed','bgColor':'bg-yellow-700', 'percent':'-10%'},
    {'id':4, 'status':'pending','bgColor':'bg-gray-700', 'percent':'0%'},
    {'id':5, 'status':'good','bgColor':'bg-cyan-600', 'percent':'100%'},
    {'id':6, 'status':'very good','bgColor':'bg-green-600', 'percent':'^300%' },
    {'id':7, 'status':'awsome','bgColor':'bg-green-700' , 'percent':'^500%'},
  ]


  // fetch status data from db

  // upload status data
  const handleResetData = () => {
    console.log("test upload click")

  }


  const handleFetchData = () => {
    
    console.log("test fetch click")

  }




  return (
    <div className='flex flex-col gap-2 h-screen w-screen'>
        
        <div className='m-1 h-8 '>
            <div className='text-xl font-bold text-center text-cyan-400'>Settings</div>
        </div>
        <div className='m-1 '>
            <div className='text-xl text-cyan-500 w-fit text-center'>
                Trade Status List:
            </div>
            <div className='flex flex-col gap-1 m-2'>
                { status_data.map((status)=> (
                    <div key={status.id} className={`flex justify-between rounded-md ${status.bgColor} text-white mx-2 px-2 py-1`}>
                        <div className={`text-xl`}>{status.status}</div>
                        <div className={`text-xl`}>{status.percent}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className='border border-gray-600 rounded-md m-10'>
            <div className='flex flex-row gap-4'>
                <div className='border text-xl border-green-900 w-fit m-2 px-2 rounded-md bg-emerald-500 text-white'
                onClick={handleResetData}>
                    reset
                </div>
                <div className='border text-xl border-blue-900 w-fit m-2 px-2 rounded-md bg-blue-500 text-white'>
                    test
                </div>
                <div 
                onClick={handleFetchData}
                className='border text-xl border-blue-900 w-fit m-2 px-2 rounded-md bg-blue-500 text-white'>
                    fetch
                </div>
            </div>
        </div>
        {/* <div className='border rounded-sm m-1 h-20'></div> */}
    </div>
  )
}


export default Settings
