import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useUser } from '../Hooks/useUser'
import axiosConfig from '../Utill/AxiosConfig';
import { API_ENDPOINTS } from '../Utill/Apiendpoints';
import { Toaster, toast } from "react-hot-toast";
import ExpenseList from '../Components/ExpenseList';
import Modal from '../Components/Modal';
import { Plus } from 'lucide-react';
import AddExpenseForm from '../Components/AddExpenseForm';
import DeleteAlert from '../Components/DeleteAlert';
import ExpenseOverView from '../Components/ExpenseOverView';

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openExpenseModel, setOpenExpenseModel] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null
  });

  // Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
      if (response.status === 200) {
        console.log("Expense data" ,response.data)
        setExpenseData(response.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for expenses
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (response.status === 200) {
        console.log("Expense categories", response.data);
        setCategories(response.data);
      }
    } catch (err) {
      console.log("Failed to fetch expense categories", err);
      toast.error("Failed to fetch expense categories");
    }
  };

  // Add expense
  const handleAddExpense = async (expense) => {
    console.log("Adding expense", expense);
    const { name, amount, date, categoryId, icon } = expense;

    if (!name || !amount || !date || !categoryId) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        categoryId,
        icon
      });
      if (response.status === 201) {
        setOpenExpenseModel(false);
        fetchExpenseDetails();
        toast.success("Expense added successfully");
      }
    } catch (err) {
      console.log("Failed to add expense", err);
      toast.error("Failed to add expense");
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
      toast.success("Expense deleted successfully");
    } catch (err) {
      console.log("Failed to delete expense", err);
      toast.error("Failed to delete expense");
    }
  };

  // Download expense details
  const handleDownloadExpenseDetails = async () => {
    console.log("Downloading expense details");
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: 'blob' });
      let fileName = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.log("Failed to download expense details", error);
      toast.error("Failed to download expense details");
    }
  };

  // Email expense details
  const handleEmailExpenseDetails = async () => {
    console.log("Email expense details");
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      console.log("Failed to email expense details", error);
      toast.error("Failed to email expense details");
    }
  };

  React.useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            {/** overview for expenses with chart */}
            <button
              onClick={() => setOpenExpenseModel(true)}
              className='flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm'>
              <Plus size={16} className=' text-lg inline-block mr-2' /> Add Expense
            </button>
            <ExpenseOverView transactions={expenseData} />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/** Add Expense Modal */}
          <Modal
            isOpen={openExpenseModel}
            onClose={() => setOpenExpenseModel(false)}
            title="Add Expense"
          >
            <AddExpenseForm onAddExpense={(expense) => handleAddExpense(expense)} categories={categories} />
          </Modal>

          {/** Delete alert modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense">
            <DeleteAlert
              content="Are you sure you want to delete this expense transaction? This action cannot be undone."
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense
