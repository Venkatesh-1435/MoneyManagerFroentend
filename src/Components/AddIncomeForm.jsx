import React from 'react'
import EmojiPickerPopUp from './EmojiPickerPopUp';
import { LoaderCircle } from 'lucide-react';

const AddIncomeForm = ({onAddIncome,categories}) => {
    const [income,setIncome]= React.useState({
        name:"",
        amount:"",
        date:"",
        categoryId:"",
        icon:""
    });
    const [loading,setLoading]=React.useState(false);
    const categoryOption=categories.map(cat=>({
        value:cat.id,
        label:cat.name
    }))
    const handleAddIncome=async()=>{
        if(loading) return;
        setLoading(true);
        try{
            await onAddIncome(income);
        }catch(err){
            console.log("Failed to add income",err);
        }finally{
            setLoading(false);
        }
    }
    React.useEffect(()=>{
        if(categories.length>0){
            setIncome({...income,categoryId:categories[0].id,icon:categories[0].icon});
        }
    },[categories])
  return (
    <div>
        <EmojiPickerPopUp
            icon={income.icon}
            onSelect={(icon) => setIncome({ ...income, icon })}
        />
        <form className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Income Name</label>
                <input 
                    type="text" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" 
                    placeholder="Salary, Freelance, etc." 
                    value={income.name}
                    onChange={(e)=>setIncome({...income,name:e.target.value})}
                />
            </div>
            {/* Amount */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input 
                    type="number" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" 
                    placeholder="Enter amount" 
                    value={income.amount}
                    onChange={(e)=>setIncome({...income,amount:e.target.value})}
                />
            </div>
            {/* Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input 
                    type="date" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" 
                    value={income.date}
                    onChange={(e)=>setIncome({...income,date:e.target.value})}
                />
            </div>
            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={income.categoryId}
                    onChange={(e) => setIncome({ ...income, categoryId: e.target.value })}
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
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" 
                    placeholder="Paste an emoji or image URL" 
                    value={income.icon}
                    readOnly
                    onChange={(e)=>setIncome({...income,icon:e.target.value})}
                />
            </div>
            <div>
                <button 
                    type="button" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
                    onClick={handleAddIncome} 
                    disabled={loading}

                >
                    {
                        loading ? (
                            <>
                            <LoaderCircle className="animate-spin mr-2 h-5 w-5"/>
                            Adding...
                            </>
                        ) : (
                            <>
                            <LoaderCircle className="mr-2 h-5 w-5" /> Add Income
                            </>
                            
                        )
                    }   
                    
                </button>
            </div>
        </form>

    </div>
  )
}

export default AddIncomeForm