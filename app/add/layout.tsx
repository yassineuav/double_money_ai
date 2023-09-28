'use client'
import Link from 'next/link'
import React, { Children, useState } from 'react'

const layout = ({children }: {children: React.ReactNode}) => {

  const [active, setActive] = useState(1)
  

  return (
    <div>
          <div className="fixed z-50 top-0 left-0 right-0 justify-center items-center grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
            <Link href="/add/months" 
            onClick={() => setActive(1)}
            className={`px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg ${active === 1 ? "bg-gray-700":"bg-gray-600"}`}>
                Months
            </Link>
            <Link 
            onClick={() => setActive(2)}
            href="/add/currentMonth" 
            className={`px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg  ${active === 2 ? "bg-gray-700":"bg-gray-600"}`}>
                Current
            </Link>
            <Link href="/add/trackGaol" 
            onClick={() => setActive(3)}
            className={`px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg ${active === 3 ? "bg-gray-700":"bg-gray-600"}`}>
                Goal
            </Link>
        </div>
          {children}
       
    </div>
  )
}

export default layout
