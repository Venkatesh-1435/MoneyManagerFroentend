import React from 'react'
import EmojiPickerPopUp from './EmojiPickerPopUp'
import { LoaderCircle } from 'lucide-react'

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = React.useState({
    name: '',
    amount: '',
    date: '',
    categoryId: '',
    icon: '',
  })

  const [loading, setLoading] = React.useState(false)

  const categoryOption = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  const handleAddExpense = async () => {
    if (loading) return
    setLoading(true)
    try {
      await onAddExpense(expense)
    } catch (err) {
      console.log('Failed to add expense', err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (categories.length > 0) {
      setExpense({
        ...expense,
        categoryId: categories[0].id,
        icon: categories[0].icon,
      })
    }
  }, [categories])

  return (
    <div>
      <EmojiPickerPopUp
        icon={expense.icon}
        onSelect={(icon) => setExpense({ ...expense, icon })}
      />
      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Expense Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            placeholder="Food, Rent, Shopping, etc."
            value={expense.name}
            onChange={(e) => setExpense({ ...expense, name: e.target.value })}
          />
        </div>
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
        </div>
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            value={expense.categoryId}
            onChange={(e) => setExpense({ ...expense, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categoryOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Icon URL</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            placeholder="Paste an emoji or image URL"
            value={expense.icon}
            readOnly
            onChange={(e) => setExpense({ ...expense, icon: e.target.value })}
          />
        </div>
        <div>
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
            onClick={handleAddExpense}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
                Adding...
              </>
            ) : (
              <>
                <LoaderCircle className="mr-2 h-5 w-5" /> Add Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddExpenseForm
