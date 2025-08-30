import React from 'react'
import Dashboard from '../Components/Dashboard'
import { useUser } from '../Hooks/useUser'
import axiosConfig from '../Utill/AxiosConfig';
import { API_ENDPOINTS } from '../Utill/Apiendpoints';
import { Toaster, toast } from "react-hot-toast";
import IncomeList from '../Components/IncomeList';
import Modal from '../Components/Modal';
import { Plus } from 'lucide-react';
import AddIncomeForm from '../Components/AddIncomeForm';
import DeleteAlert from '../Components/DeleteAlert';
import IncomeOverView from '../Components/IncomeOverView';
const Income = () => {
  useUser();
  const [incomeData, setIncomeData]= React.useState([]);
  const[categories,setCategories]=React.useState([]);
  const [loading,setLoading]=React.useState(false);
  const[openIncomeModel,setOpenIncomeModel]=React.useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=React.useState({
    show:false,
    data:null
  });
  const fetchIncomeDetails=async()=>{
    if(loading) return;
    setLoading(true);
    try{
      const response=await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOME);
      if(response.status===200){
        
        setIncomeData(response.data);
      }

    }catch(err){
      console.log(err);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  }
  const fetchIncomeCategories=async()=>{
    try{
      const response=await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if(response.status===200){
        console.log("Income categories",response.data);
        setCategories(response.data);
      }
    }catch(err){
      console.log("Failed to fetch income categories",err);
      toast.error("Failed to fetch income categories");
    }
  }
  const handleAddIncome=async(income)=>{
    console.log("Adding income",income);
    const{name,amount,date,categoryId,icon}=income;
    if(!name || !amount || !date || !categoryId){
      toast.error("Please fill all the fields");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Please enter a valid amount");
      return;
    }
    const today=new Date().toISOString().split("T")[0];
    if(date>today){
      toast.error("Date cannot be in the future");
      return;
    }
    if(!categoryId){
      toast.error("Please select a category");
      return;
    }
    try{
      const response=await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
        name,
        amount: Number(amount), 
        date, 
        categoryId, 
        icon
      });
      if(response.status===201){
          setOpenIncomeModel(false);
          fetchIncomeDetails();
          toast.success("Income added successfully");
      }
    }catch(err){
      console.log("Failed to add income",err);
      toast.error("Failed to add income");
    }
  }
  const deleteIncome=async(id)=>{
    
    try{
      const response=await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      
        setOpenDeleteAlert({show:false,data:null});
        fetchIncomeDetails();
        toast.success("Income deleted successfully");
      
    }catch(err){
      console.log("Failed to delete income",err);
      toast.error("Failed to delete income");
    }
  }
  const handleDownloadIncomeDetails= async()=>{
    console.log("Downloading income details");
    try{
       const response=await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:'blob'});
       let fileName="income_details.xlsx";
       const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Income details downloaded successfully");
    }catch(error){
      console.log("Failed to download income details",error);
      toast.error("Failed to download income details");
    }
  }
  const handleEmailIncomeDetails=async()=>{
    console.log("Email income details");
    try{
      const response= await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status===200){
        toast.success("Income details emailed successfully");
      }
    }catch(error){
      console.log("Failed to email income details",error);
      toast.error("Failed to email income details");
    }
  }
  React.useEffect(()=>{
    fetchIncomeDetails();
    fetchIncomeCategories();
  },[])
  return (
        <Dashboard activeMenu="Income">
            <div className='my-5 mx-auto'>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                {/** overview for income with line char */}
                <button  onClick={()=>setOpenIncomeModel(true)} 
                className='flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200 disabled:opacity-60 cursor-pointer text-sm' >
                  <Plus size={16} className=' text-lg inline-block mr-2' /> Add Income
                </button>
                <IncomeOverView transactions={incomeData}/>
              </div>
              <IncomeList 
              transactions={incomeData} 
              onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
              onDownload={handleDownloadIncomeDetails}
              onEmail={handleEmailIncomeDetails}
              />
              {/** Add income Model */}
              <Modal
                isOpen={openIncomeModel}
                onClose={()=>setOpenIncomeModel(false)}
                title="Add Income"
              ><AddIncomeForm onAddIncome={(income)=>handleAddIncome(income)} 
                categories={categories} />
                 </Modal>
                 {/** Delete alert model */}
                 <Modal
                  isOpen={openDeleteAlert.show}
                  onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                  title="Delete Income">
                    <DeleteAlert 
                    content="Are you sure you want to delete this income transaction? This action cannot be undone."
                    onDelete={()=>deleteIncome(openDeleteAlert.data)}
                    />
                  </Modal>
            </div>
            </div>
        </Dashboard>
  )
}

export default Income