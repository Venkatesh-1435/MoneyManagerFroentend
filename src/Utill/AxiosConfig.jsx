import axios from "axios";

const axiosConfig=axios.create({
    baseURL: "http://localhost:9000/api/v1.0",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
})

const excludeEndpoints =[
    "/login",
    "/register",
    "/status",
    "/activate",
    "/health"
]

axiosConfig.interceptors.request.use((config) => {
    const skipToken=excludeEndpoints.some((endpoint)=>{
         config.url.includes(endpoint)
    });

    if(!skipToken){
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }   
    }
    return config;
}
, (error) => {
    return Promise.reject(error);
})

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }else if (error.response && error.response.status === 500){
        console.log(error.response.data.message);
    }else if (error.code==="CONNECTIONABORTED"){
        console.error("Request timeout . Please try again;")
    }
    return Promise.reject(error);
  }
);


export default axiosConfig;