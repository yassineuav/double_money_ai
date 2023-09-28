'use client'
import Link from 'next/link'
import React, { Children } from 'react'

const layout = ({children,}: {children: React.ReactNode}) => {
  return (
    <div>
          <div className="fixed  z-50 top-0 left-0 right-0 justify-center items-center grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
            <Link href="/add/months" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                Months
            </Link>
            <Link href="/add/currentMonth" type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                Current
            </Link>
            <button type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                To Do
            </button>
        </div>
        {children}
    </div>
  )
}

export default layout
