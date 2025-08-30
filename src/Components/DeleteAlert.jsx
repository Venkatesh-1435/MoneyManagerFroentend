import React from 'react'

const DeleteAlert = ({content,onDelete}) => {
    //const [loading,setLoading]=React.useState(false);
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex items-center gap-3 justify-end mt-4'>
            <button 
            onClick={onDelete}
            type='button'
            className='px-3 py-2 text-white rounded-lg bg-red-500 hover:bg-red-800 transition-all duration-200 cursor-pointer text-sm'>
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert