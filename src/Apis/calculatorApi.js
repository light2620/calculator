import axiosInstance from "../AxiosInstance/AxiosInstance";


const calculaterApi = async(data) => {
    try{
        const response = await axiosInstance.post("/calculate",data)
        return response;
    }catch(err){
        throw err
    }
}

export {calculaterApi}