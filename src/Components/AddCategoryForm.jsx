import React from "react";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory ,initialCategoryData,isEditing}) => {
  const [category, setCategory] = React.useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }else{
            setCategory({
                name: "",
                type: "income",
                icon: "",
            });
        }
    }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddCategory(category); // waits for async call
      setCategory({ name: "", type: "income", icon: "" }); // reset form
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-[300px]">
      <div className="w-full max-w-md bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl p-6">
        <h3 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            {isEditing ? "Update Category" : "Add Category"}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
            {isEditing ? "Update your category details below." : "Add a new category to organize your transactions."}
        </p>
        <EmojiPickerPopUp
          icon={category.icon}
          onSelect={(icon) => setCategory({ ...category, icon })}
        />

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g Salary, Food"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              value={category.type}
              onChange={(e) =>
                setCategory({ ...category, type: e.target.value })
              }
            >
              {categoryTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Icon URL
            </label>
            <input
              type="text"
              placeholder="Paste an emoji or image URL"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              value={category.icon}
              onChange={(e) =>
                setCategory({ ...category, icon: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer transition flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                {
                    isEditing ? "Updating Category..." : "Adding Category..."
                }
              </>
            ) : (
              <>
                {
                    isEditing ? "Update Category" : "Add Category"
                }
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
