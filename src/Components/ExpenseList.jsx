import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionInformationCard from './TransactionInformationCard'
import moment from 'moment/moment'

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h5 className="text-xl font-semibold text-gray-800">Expense Source</h5>

        <div className="flex items-center gap-2 sm:justify-end">
          <button
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm"
            onClick={onEmail}
          >
            <Mail size={16} className="h-4 w-4" /> Email
          </button>
          <button
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm"
            onClick={onDownload}
          >
            <Download size={16} className="h-4 w-4" /> Download
          </button>
        </div>
      </div>

      {/* Expense Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions?.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInformationCard
              key={expense.id}
              icon={expense.category?.icon}
              title={expense.name}
              date={moment(expense.date).format('DD MMM YYYY')}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center py-4">
            No expense transactions found
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpenseList
