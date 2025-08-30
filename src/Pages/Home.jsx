import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import { useUser } from '../Hooks/useUser'
import Infocard from '../Components/Infocard';
import { Coins, Wallet, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../Utill/AxiosConfig';
import { API_ENDPOINTS } from '../Utill/Apiendpoints';
import RecentTransactions from '../Components/RecentTransactions';
import FinanceOverview from '../Components/FinanceOverview';
import Transactions from '../Components/Transactions';

const Home = () => {
  useUser();
  const navigate=useNavigate();
  const[dashboardData,setDashboardData]=React.useState(null);
  const[loading,setLoading]=useState(false);
  const fetchDashboard=async()=>{

    if(loading) return;
    setLoading(true);

    try{
      const response= await axiosConfig.get(API_ENDPOINTS.DASHBOARDDATA)

      if(response.status===200){
        console.log(response.data)
        setDashboardData(response.data);
      }
      
    }catch(error){
      console.log("Some went wrong while fetching dashboard data",error)
    }finally{
      setLoading(false);
    }


  }
  useEffect(()=>{
    fetchDashboard();
  },[])
  return (
    <div>
        <Dashboard activeMenu="Dashboard">
          <div className='my-5 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'> 
                {/**display the cards */}
                <Infocard
                  icon={<WalletCards/>}
                  label={"Total Balance"}
                  value={dashboardData?.totalBalance || 0}
                  color={"bg-purple-800"}
                />
                <Infocard
                  icon={<Wallet/>}
                  label={"Total Income"}
                  value={dashboardData?.totalIncome || 0}
                  color={"bg-green-800"}
                />
                <Infocard
                  icon={<Coins/>}
                  label={"Total Expense"}
                  value={dashboardData?.totalExpenses || 0}
                  color={"bg-red-800"}
                />
            </div>

            <div className=' grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

              {/** Recent transactions */}

              <RecentTransactions

              transactions={dashboardData?.recentTransactions || []}
              onMore={()=>navigate("/expense")}
              
              />

              {/** finance overview  chart */}
              <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
              
              />

              {/** Expense transactions */}

              <Transactions
                transactions={dashboardData?.recent5Expense || []}
                onMore={()=>navigate("/expense")}
                type="expense"
                title="Recent Expenses"
              />

              {/** Income transcations  */}
              <Transactions
                transactions={dashboardData?.recent5Incomes || []}
                onMore={()=>navigate("/income")}
                type="income"
                title="Recent Incomes"
              />

            </div>

          </div>
        </Dashboard>
    </div>
  )
}

export default Home