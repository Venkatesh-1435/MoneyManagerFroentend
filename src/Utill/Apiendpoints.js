export const BASE_URL="http://localhost:9000/api/v1.0";
const CLOUDINARY_NAME="ddvirndgj";
 export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_CATEGORYS: "/category",
    ADD_CATEGORY: "/category",
    UPDATE_CATEGORY: (categoryId)=>`/category/${categoryId}`,
    GET_ALL_INCOME: "/incomes",
    GET_ALL_EXPENSE:"/expenses",
    CATEGORY_BY_TYPE: (type)=>`/category/${type}`,
    ADD_INCOME: "/incomes",
    ADD_EXPENSE:"/expenses",
    DELETE_INCOME: (incomeId)=>`/incomes/${incomeId}`,
    DELETE_EXPENSE:(expenseId)=>`/expenses/${expenseId}`,
    INCOME_EXCEL_DOWNLOAD: "excel/download/income",
    EXPENSE_EXCEL_DOWNLOAD:"excel/download/expense",
    EMAIL_INCOME: "email/income-excel",
    EMAIL_EXPENSE:"email/expense-excel",
    APPLY_FILTERS:"/filter",
    DASHBOARDDATA:"/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
}

