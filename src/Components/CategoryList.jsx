import { Layers2, Pencil } from 'lucide-react'
import React from 'react'

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 border border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <h4 className='text-lg font-semibold'>Category Source</h4>
      </div>

      {/* Category List */}
      {categories.length === 0 ? (
        <div className='text-center text-gray-500'>
          No categories added yet. Add some to get started
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              {/* Icon/Emoji */}
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xl font-medium">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-7 h-7"
                  />
                ) : (
                  <Layers2 className="w-7 h-7 text-purple-800" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex items-center justify-between w-full">
                <div>
                    <p className='text-sm text-gray-700 font-medium'>
                        {category.name}
                    </p>
                    <p className='text-sm text-gray-400 mt-1 capitalize font-medium'>
                        {category.type}
                    </p>
                </div>
                {/* Actions */}
                <div className='flex items-center gap-2 mt-2 sm:mt-0 sm:ml-auto hidden group-hover:flex'>
                    <button 
                    onClick={()=>onEditCategory(category)}
                    className='text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer '>
                        <Pencil size={18} className='w-4 h-4'/>
                    </button>

                </div>
              </div>
    
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
