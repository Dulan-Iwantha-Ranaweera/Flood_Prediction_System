import React from 'react'
import  { useEffect, useState } from 'react';

function Timecard() {

    const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xl rounded-xl py-4 mr-20 ">
      <div className="p-4 px-32 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-black">
        Time & Date
        </h3>
        
        <p className="mt-5 text-xl text-gray-500 dark:text-neutral-500 ">
          Last updated: {dateTime.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default Timecard
