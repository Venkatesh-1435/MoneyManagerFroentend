import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from 'lucide-react';
import React from 'react'

const TransactionInformationCard = ({icon,title,date,amount,type,hideDeleteButton,onDelete}) => {
    const getAmountStyles=()=>{
        if(type==="income"){
            return "text-green-500 bg-green-100";
        }else if(type==="expense"){
            return "text-red-500 bg-red-100";
        }else{
            return "text-gray-500";
        }
    }
  return (
    <div className='group relative flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-500 text-xl'>
            {
                icon?(
                    <img src={icon} alt={title} className='w-6 h-6 object-contain'/>
                ):(
                    <UtensilsCrossed size={20} className='text-purple-500' />
                )
            }

        </div>
        <div className='flex-1 flex items-center justify-between'>
            <div>
                <h4 className='text-md font-semibold text-gray-700'>{title}</h4>
                <p className='text-sm text-gray-500 mt-1'>{date}</p>
            </div>

            <div className='flex items-center gap-4'>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getAmountStyles()}`}>${amount}
                    {
                        type==="income" ? (
                            <TrendingUp size={16} className='inline-block ml-1'/>

                        ):(
                            <TrendingDown size={16} className='inline-block ml-1'/>
                        )
                    }
                </span>
                {
                    !hideDeleteButton && (
                        <button 
                        onClick={onDelete}
                        className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 p-1 rounded-full cursor-pointer'>
                            <Trash2 size={18} />

                        </button>
                    )
                }

            </div>

        </div>
       
    </div>
  )
}

export default TransactionInformationCard