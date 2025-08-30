import React, { useState } from "react";
import Dashboard from "../Components/Dashboard";
import { useUser } from "../Hooks/useUser";
import { Search } from "lucide-react";
import axiosConfig from "../Utill/AxiosConfig";
import { API_ENDPOINTS } from "../Utill/Apiendpoints";
import TransactionInformationCard from "../Components/TransactionInformationCard"
import moment from 'moment/moment';

const Filter = () => {
  useUser();

  // keep all filters in one object
  const [filters, setFilters] = useState({
    type: "income",
    startDate: "",
    endDate: "",
    keyword: "",
    sortOrder: "asc",
    sortField:"date"
  });
  //const[sortField,setSortField]=useState("date");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Searching with filters:", filters);
      // Example: call API with filters
      // const response = await axios.post("/api/transactions/filter", filters);
      // setTransactions(response.data);
      const response= await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS,
        filters
      )
      setTransactions(response.data);
      console.log(transactions);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch transactions", error);
    }finally{
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto w-full px-4">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Filters Transactions</h1>
        </div>

        {/* Card */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-end gap-4"
          >
            {/* Type */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="border cursor-pointer border-purple-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Date Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleChange}
                  className="border border-purple-400 cursor-pointer rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="px-1">to</span>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleChange}
                  className="border border-purple-400 cursor-pointer rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            {/**Sort Field */}
              <div className="flex flex-col">
              <label className="mb-2 font-medium">SortField</label>
              <select
                name="sortField"
                value={filters.sortField}
                onChange={handleChange}
                className="border border-purple-400 rounded-md cursor-pointer p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category"> Category</option>
              </select>
            </div>


            {/* Sort */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Sort</label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleChange}
                className="border border-purple-400 rounded-md cursor-pointer p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Keyword */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium">Keyword</label>
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                placeholder="Search..."
                className="border border-purple-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium invisible">Search</label>
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-purple-700 transition cursor-pointer disabled:opacity-50"
              >
                <Search size={18} className="mr-2" />
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>
          {
            transactions.length===0 && !loading? (
              <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
            ):("")
          }
          {
            loading ?(
              <p className="text-gray-500">Loading Transactions</p>
            ):("")
          }
          {
            transactions.map((transaction)=>(
              <TransactionInformationCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format("DD MMM YYYY")}
                amount={transaction.amount}
                type={filters.type}
                hideDeleteButton

              />
            ))
          }
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
