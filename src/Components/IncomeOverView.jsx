import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncomeOverView = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const groupedData = {};
      transactions.forEach((txn) => {
        const date = new Date(txn.date).toLocaleDateString("default", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        if (!groupedData[date]) {
          groupedData[date] = 0;
        }
        groupedData[date] += txn.amount;
      });

      const chartDataArray = Object.keys(groupedData).map((date) => ({
        date,
        amount: groupedData[date],
      }));

      chartDataArray.sort((a, b) => new Date(a.date) - new Date(b.date));
      setChartData(chartDataArray);
    }
  }, [transactions]);

  return (
    <div className="bg-white shadow-lg mt-3 rounded-2xl p-4 sm:p-6">
      <h5 className="text-xl font-semibold text-gray-800 mb-2">Income Overview</h5>
      <p className="text-sm text-gray-500 mb-4">
        Track your earnings over time and analyze your income trends
      </p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="purple" stopOpacity={0.4} />
                <stop offset="95%" stopColor="purple" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            {/* Shaded area with smooth curve */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="purple"
              strokeWidth={2}
              fill="url(#colorIncome)"
              dot
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverView;
