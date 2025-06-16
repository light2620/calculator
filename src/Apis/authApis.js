import axiosInstance from "../AxiosInstance/AxiosInstance"

const loginApi = async(data) => {
   try{
    const response = await axiosInstance.post("login/",data);
    return response;
   }catch(err){
    throw err
   }
}

const createUserApi = async(data) => {
    try{
        const response = await  axiosInstance.post("register/",data);
        return response
    }catch(err){
        throw err
    }
}

export {loginApi,createUserApi}