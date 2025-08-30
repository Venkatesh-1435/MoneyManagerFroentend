import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInformationCard from './TransactionInformationCard'
import moment from 'moment'

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className='bg-white p-5 rounded-lg shadow-md'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg'>Recent Transactions</h4>
        
        <button
          onClick={onMore}
          className='cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200 text-sm disabled:opacity-60'
        >
          <span>More</span>
          <ArrowRight size={15} />
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInformationCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format('DD MMM YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteButton
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions
