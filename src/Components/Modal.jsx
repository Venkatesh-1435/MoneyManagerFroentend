import { X } from 'lucide-react';
import React from 'react'

const Modal = ({isOpen,onClose,children,title}) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm '>
        <div className='relative p-4 w-full max-w-2xl max-h-[90vh]'>
            {/* Model header */}
            <div className='relative bg-white rounded-xl shadow-2xl border border-gray-200 '>
                {/* Model content */}
                <div className='flex items-center justify-between p-4 md:p-6 border-b border-gray-200 rounded-t-xl'>
                    <h3 className='text-lg font-semibold text-gray-900 '>
                        {title}
                    </h3>
                    <button onClick={onClose} 
                    type='button'
                    className='text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-9 h-9 p-1.5  inline-flex items-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        <X size={18} className='w-5 h-5'/>
                    </button>
                </div>
                {/* Model body */}
                <div className='p-4 md:p-6 overflow-y-auto max-h-[70vh]'>
                    {children}
                </div>

            </div>

        </div>
    </div>
  )
}

export default Modal