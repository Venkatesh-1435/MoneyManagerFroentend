import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ['#591688', '#a0090e', '#016630']

  const balanceData = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Expenses', amount: totalExpense },
    { name: 'Total Income', amount: totalIncome },
  ]

  return (
    <div className='bg-white p-5 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold'>Financial Overview (Donut)</h5>
      </div>

      <div className='h-80'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={balanceData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}   // 👈 makes it donut style
              outerRadius={100}
              paddingAngle={5}
              label
            >
              {balanceData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceOverview
