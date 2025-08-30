import React, { useState } from 'react'

import Dashboard from '../Components/Dashboard'
import { useUser } from '../Hooks/useUser'
import { Plus } from 'lucide-react';
import CategoryList from '../Components/CategoryList';
import axiosConfig from '../Utill/AxiosConfig';
import { API_ENDPOINTS } from '../Utill/Apiendpoints';
import toast from 'react-hot-toast';
import Modal from '../Components/Modal';
import AddCategoryForm from '../Components/AddCategoryForm';
const Category = () => {
  useUser();

  const[loading,setLoading]=useState(false);
  const[categoryData,setCategoryData]=useState([]);
  const [openAddCategoryModal,setOpenAddCategoryModal]=useState(false);
  const [openUpdateCategoryModal,setOpenUpdateCategoryModal]=useState(false);
  const [selectedCategory,setSelectedCategory]=useState(null);
  const fetchCategoryDetails=async()=>{
    if(loading){
      return;
    }
    setLoading(true);
    try{
      const response=await axiosConfig.get(API_ENDPOINTS.GET_CATEGORYS);
      if(response.status===200 && response.data){
        console.log("category data",response.data);
        setCategoryData(response.data);
      }
    }catch(error){
      console.log("error while fetching category data",error);
      toast.error(error.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    fetchCategoryDetails();
  },[])
  const handleAddCategory = async (category) => {
  console.log("category added", category);
  const { name, type, icon } = category;

  if (!name || !type) {
    toast.error("All fields are required");
    return;
  }
  {/* add validation */ }
  const isDuplicate= categoryData.some((cat)=>{
    if(cat.name.toLowerCase()===name.trim().toLowerCase() && cat.type===type){
      return true;
    }
    return false;
  })
  if(isDuplicate){
    toast.error("Category already exists");
    return;
  }

  const toastId = toast.loading("Adding category...");

  axiosConfig
    .post(API_ENDPOINTS.ADD_CATEGORY, { name, type, icon })
    .then((response) => {
      if (response.status === 201 && response.data) {
        

        // Add a slight delay before closing modal & refreshing
        setTimeout(() => {
          setOpenAddCategoryModal(false);
          fetchCategoryDetails(); // Refresh the category list
          toast.success("Category added successfully");
        }, 3000); // 1 second delay
        
      } 
    })
    .catch((error) => {
      console.log("error while adding category", error);
      toast.error(error.message || "Something went wrong");
    })
    .finally(() => {
      // Add delay before dismissing loader for smooth UX
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    });
};
const handleEditCategory=(categoryToEdit)=>{
  setSelectedCategory(categoryToEdit);
  setOpenUpdateCategoryModal(true);
}
const handleUpdateCategory=async(updateCategory)=>{
  const{id,name,type,icon}=updateCategory;
  if(!name || !type){
    toast.error("All fields are required");
    return;
  }
  if(!id){
    toast.error("Invalid category");
    return;
  }
  
  const toastId = toast.loading("Updating category...");
  try{
    const response= await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
    if(response.status===200 && response.data){
      setTimeout(() => {
        setOpenUpdateCategoryModal(false);
        setSelectedCategory(null);
        fetchCategoryDetails();
        toast.success("Category updated successfully");
      }, 3000); // 1 second delay
    }
  }catch(error){
    console.log("error while updating category", error);
    toast.error(error.message || "Something went wrong");
  }finally{
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);
  }
}


  return (
       <Dashboard activeMenu="Category">
          <div className='my-5 mx-auto'>
            {/* Add button to add category */}
              <div className='flex justify-between items-center  mb-5'>
                <h2 className='text-2xl font-semibold'>All Categories</h2>
                <button onClick={()=>setOpenAddCategoryModal(true)}
                 className='flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md shadow-md transition cursor-pointer'>
                  <Plus  size={15}/> Add Category
                </button>

              </div>


            {/* Category list */}
            <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>




            {/* Adding category model */}
            <Modal title="Add Category"
             isOpen={openAddCategoryModal}
             onClose={()=>setOpenAddCategoryModal(false)}>
              <AddCategoryForm onAddCategory={handleAddCategory} />
            </Modal>


            {/* updating category */}
            <Modal title="Update Category"
              isOpen={openUpdateCategoryModal}
              onClose={()=>{
                setOpenUpdateCategoryModal(false);
                setSelectedCategory(null);
              }}
              >
              <AddCategoryForm 
              initialCategoryData={selectedCategory} 
              onAddCategory={handleUpdateCategory} 
              isEditing={true}/>
             
            </Modal>
          </div>
          
      </Dashboard>
  )
}

export default Category